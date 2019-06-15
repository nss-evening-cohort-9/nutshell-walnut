import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getUsers = () => axios.get(`${firebaseUrl}/users.json`);

const getUsername = uid => new Promise((resolve, reject) => {
  getUsers()
    .then((users) => {
      const userObjects = users.data;
      const usersArray = Object.values(userObjects);
      const matchingUser = usersArray.find(u => u.uid === uid);
      const myUsername = matchingUser.username;
      resolve(myUsername);
    })
    .catch(err => reject(err));
});


const addUsername = userObject => axios.post(`${firebaseUrl}/users.json`, userObject);

export default { getUsers, addUsername, getUsername };
