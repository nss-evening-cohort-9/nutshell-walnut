import firebase from 'firebase/app';
import 'firebase/auth';

import eventsData from '../../helpers/data/eventsData';
import util from '../../helpers/util';


const eventDiv = document.getElementById('events');
// const neweventDiv = document.getElementById('new-event');

// const createNewevent = (e) => {
//   e.preventDefault();
//   const newevent = {
//     title: document.getElementById('title').value,
//     dayOfWeek: document.getElementById('dayOfWeek').value,
//     uid: firebase.auth().currentUser.uid,
//     dateOfMonth: document.getElementById('dateOfMonth').value,
//     month: document.getElementById('month').value,
//     imageUrl: document.getElementById('imageUrl'),
//     description: document.getElementById('description'),
//   };
//   eventsData.addNewevent(newevent)
//     .then(() => {
//       document.getElementById('name').value = '';
//       document.getElementById('email').value = '';
//       eventDiv.classList.remove('hide');
//       neweventDiv.classList.add('hide');
//       getEvents(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
//     })
//     .catch(err => console.error('no new events', err));
//   console.error(newevent);
// };

// const newEventButton = () => {
//   eventDiv.classList.add('hide');
//   neweventDiv.classList.remove('hide');
//   document.getElementById('saveNewevent').addEventListener('click', createNewevent);
// };

// const deleteEventsEvent = (e) => {
//   const eventId = e.target.id;
//   eventsData.deleteevent(eventId)
//     .then(() => getevents(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
//     .catch(err => console.error('no deletion', err));
// };


// const addEvents = () => {
//   document.getElementById('add-event-button').addEventListener('click', newEventButton);
//   const deleteButtons = document.getElementsByClassName('delete-event');
//   for (let i = 0; i < deleteButtons.length; i += 1) {
//     deleteButtons[i].addEventListener('click', deleteEventsEvent);
//   }
// };

const showEvents = (events) => {
  let domString = '<div class="col-6 offset-3">';
  domString += '<h2>Events</h2>';
  domString += '<button id="add-event-button" class="btn btn-info">Add Event</button>';
  events.forEach((event) => {
    console.error(event);
    let domString = '';
    domString += `<div>${event.title}</div>`;
  util.printToDom('events', domString);
  addEvents();
});


const getEvents = () => {
  eventsData.getEvents()
    .then((events) => {
          showevents();
        })
    .catch(err => console.error('no events', err));
}

// export default { getEvents };
