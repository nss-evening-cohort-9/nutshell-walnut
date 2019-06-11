import firebase from 'firebase/app';
import 'firebase/auth';

import eventsData from '../../helpers/data/eventsData';
import util from '../../helpers/util';


const eventDiv = document.getElementById('events');
const neweventDiv = document.getElementById('new-events');

const createNewevent = (e) => {
  e.preventDefault();
  const newevent = {
    title: document.getElementById('title').value,
    dayOfWeek: document.getElementById('dayOfWeek').value,
    uid: firebase.auth().currentUser.uid,
    dateOfMonth: document.getElementById('dateOfMonth').value,
    month: document.getElementById('month').value,
    imageUrl: document.getElementById('imageUrl'),
    description: document.getElementById('description'),
  };
  eventsData.addNewevent(newevent)
    .then(() => {
      document.getElementById('title').value = '';
      document.getElementById('dayOfWeek').value = '';
      document.getElementById('dateOfMonth').value = '';
      document.getElementById('month').value = '';
      document.getElementById('imageUrl').value = '';
      document.getElementById('description').value = '';
      eventDiv.classList.remove('hide');
      neweventDiv.classList.add('hide');
      getEvents(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new events', err));
  console.error(newevent);
};

const newEventButton = () => {
  eventDiv.classList.add('hide');
  neweventDiv.classList.remove('hide');
  document.getElementById('saveNewevent').addEventListener('click', createNewevent);
};

const deleteEventsEvent = (e) => {
  const eventId = e.target.id.split('.')[1];
  eventsData.deleteEvent(eventId)
    .then(() => getEvents(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};


const addEvents = () => {
  const addbtn = document.getElementsByClassName('add-event-button');
  Array.from(addbtn).forEach((onebtn) => {
    onebtn.addEventListener('click', newEventButton);
  });
  const deleteButtons = document.getElementsByClassName('delete-event');
  Array.from(deleteButtons).forEach((onedlt) => {
    onedlt.addEventListener('click', deleteEventsEvent);
  });
};

const showEvents = (events) => {
  let domString = '<div class="col-6 offset-3">';
  events.forEach((event) => {
    console.error(event);
    domString += `<div>${event.title}</div>`;
    domString += '<button class="add-event-button">Add</button>';
    domString += `<button class="delete-event" id="dlt-btn.${event.id}">Delete</button>`;
    util.printToDom('events', domString);
    addEvents();
  });
};

const getEvents = () => {
  eventsData.getEvents()
    .then((events) => {
      showEvents(events);
    })
    .catch(err => console.error('no events', err));
};

export default { getEvents, addEvents };
