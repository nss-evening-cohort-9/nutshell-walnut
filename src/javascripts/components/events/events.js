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
};

const newEventButton = () => {
  eventDiv.classList.add('eventafter');
  neweventDiv.classList.remove('hide');
  document.getElementById('saveNewevent').addEventListener('click', createNewevent);
};

const deleteEventsEvent = (e) => {
  const eventId = e.target.id.split('.')[1];
  eventsData.deleteEvent(eventId)
    .then(() => getEvents(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const cancelAddEvent = () => {
  getEvents(); // eslint-disable-line no-use-before-define
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
  const cancelButton = document.getElementById('cancel-btn');
  cancelButton.addEventListener('click', cancelAddEvent);
};

const showEvents = (events) => {
  let domString = '<h3 class="events-title">My Events</h3>';
  events.forEach((event) => {
    domString += '<div class="eventwrapper">';
    domString += '<div class="dateSideDiv col-3">';
    domString += `<h6>${event.dayOfWeek}</h6>`;
    domString += `<h1>${event.dateOfMonth}</h1>`;
    domString += `<h6>${event.month}</h6>`;
    domString += '</div>';
    domString += '<div class="eventSideDiv col-5">';
    domString += `<h2>${event.title}</h2>`;
    domString += `<div><img src="${event.imageUrl}"></div>`;
    domString += `<div>${event.description}</div>`;
    domString += `<button class="delete-event btn btn-warning" id="dlt-btn.${event.id}">Delete this event?</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '<button class="add-event-button btn btn-warning">Add</button>';
  domString += '</div>';
  util.printToDom('events', domString);
  addEvents();
};

const getEvents = () => {
  eventsData.getEvents()
    .then((events) => {
      showEvents(events);
    })
    .catch(err => console.error('no events', err));
};

export default { getEvents, addEvents };
