import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getUsers = () => axios.get(`${firebaseUrl}/users.json`);

const addUsername = userObject => axios.post(`${firebaseUrl}/users.json`, userObject);

export default { getUsers, addUsername };
