import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getUsers = () => axios.get(`${firebaseUrl}/users.json`);

const getUsername = (uid) => {
  getUsers()
    .then((users) => {
      const userObjects = users.data;
      const usersArray = Object.values(userObjects);
      const matchingUser = usersArray.find(u => u.uid === uid);
      console.error(matchingUser);
      const myUsername = matchingUser.username;
      return myUsername;
    })
    .catch(err => console.error('shitaintworking', err));
};


const addUsername = userObject => axios.post(`${firebaseUrl}/users.json`, userObject);

export default { getUsers, addUsername, getUsername };
