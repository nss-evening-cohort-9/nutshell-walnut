import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getEventsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const eventResults = results.data;
      const events = [];
      Object.keys(eventResults).forEach((eventId) => {
        eventResults[eventId].id = eventId;
        events.push(eventResults[eventId]);
      });
      resolve(events);
    })
    .catch(err => reject(err));
});

const addNewevent = eventObject => axios.post(`${firebaseUrl}/events.json`, eventObject);

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

const editEventEntry = (objectId, editedObject) => axios.put(`${firebaseUrl}/events/${objectId}.json`, editedObject);

export default {
  addNewevent,
  getEventsByUid,
  deleteEvent,
  editEventEntry,
};
