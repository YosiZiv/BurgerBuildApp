import * as actionTypes from './actionTypes';
import axios from 'axios';  

 const authStart = () => {
        return {
            type: actionTypes.AUTH_START
        };
};

 const authSuccess = (token, userId) => {
    return {
       type: actionTypes.AUTH_SUCCESS,
       idToken: token,
       userId: userId
    };
};
 const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};
 export const logout = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('expirationDate');
     localStorage.removeItem('userId')
   return {
    type: actionTypes.AUTH_LOGOUT
   }
}
 const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000 )
    }
}
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBDglwb-c7LaxQyWtTdk1CCb4IRfo0l2Ks'
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBDglwb-c7LaxQyWtTdk1CCb4IRfo0l2Ks'
        }
        axios.post(url, authData)
        .then(response => { 
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate );
            localStorage.setItem('userId',response.data.localId );
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn));   
         })
        .catch(err => {
            dispatch(authFail(err.response.data.error))
        })
        
    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId =  localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime() ) /1000 ));
            }
        }
    }
}