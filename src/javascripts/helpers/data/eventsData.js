import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getEventsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const eventResults = results.data;
      const events = [];
      Object.keys(eventResults).forEach((eventId) => {
        eventResults[eventId].id = eventId;
        eventResults[eventId].rsvpId = '';
        eventResults[eventId].statusId = 'status1';
        events.push(eventResults[eventId]);
      });
      resolve(events);
    })
    .catch(err => reject(err));
});

const addNewevent = eventObject => axios.post(`${firebaseUrl}/events.json`, eventObject);

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

export default { addNewevent, getEventsByUid, deleteEvent };
