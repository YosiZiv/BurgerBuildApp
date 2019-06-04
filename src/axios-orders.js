import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://udemy-ng-http-ebb4c.firebaseio.com/',
    
})
export default instance;
