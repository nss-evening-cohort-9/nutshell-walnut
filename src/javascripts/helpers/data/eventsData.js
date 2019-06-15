import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getEvents = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json`)
    .then((results) => {
      const eventResults = results.data || {};
      const events = [];
      Object.keys(eventResults).forEach((event) => {
        eventResults[event].id = event;
        events.push(eventResults[event]);
      });
      resolve(events);
    })
    .catch(err => reject(err));
});

const addNewevent = eventObject => axios.post(`${firebaseUrl}/events.json`, eventObject);

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

export default { addNewevent, getEvents, deleteEvent };
