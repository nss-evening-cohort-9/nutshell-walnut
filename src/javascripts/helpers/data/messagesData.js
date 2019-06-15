import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getMessages = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/messages.json`)
    .then((results) => {
      const messageResults = results.data;
      const messages = [];
      Object.keys(messageResults).forEach((message) => {
        messageResults[message].id = message;
        messages.push(messageResults[message]);
      });
      resolve(messages);
    })
    .catch(err => reject(err));
});

const addNewMessage = messageObject => axios.post(`${firebaseUrl}/messages.json`, messageObject);

const deleteMessage = messageId => axios.delete(`${firebaseUrl}/messages/${messageId}.json`);

const editMessage = (messageId, editedMessage) => axios.put(`${firebaseUrl}/messages/${messageId}.json`, editedMessage);

export default {
  getMessages,
  addNewMessage,
  deleteMessage,
  editMessage,
};
