import axios from 'axios';
const { FIREBASE_URL } = require('./config/setting');

const instance = axios.create({
    baseURL: FIREBASE_URL,
    
})
export default instance;
