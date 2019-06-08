import firebase from 'firebase/app';
import 'firebase/auth';

import diary from '../diary/diary';

const messagesDiv = document.getElementById('messages');
const newsDiv = document.getElementById('news');
const diaryDiv = document.getElementById('diary');
const eventDiv = document.getElementById('events');

const navbarEvents = () => {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.id === 'navbar-button-logout') {
        e.preventDefault();
        document.getElementById('diary-entries').classList.remove('hide');
        diary.diaryPrintToDom(firebase.auth().currentUser.uid);
        firebase.auth().signOut()
          .then(() => {
            console.error('bye');
          })
          .catch(err => console.error('no', err));
      } else if (e.target.id === 'navbar-button-messages') {
        messagesDiv.classList.remove('hide');
        newsDiv.classList.add('hide');
        diaryDiv.classList.add('hide');
        eventDiv.classList.add('hide');
      } else if (e.target.id === 'navbar-button-news') {
        messagesDiv.classList.add('hide');
        newsDiv.classList.remove('hide');
        diaryDiv.classList.add('hide');
        eventDiv.classList.add('hide');
      } else if (e.target.id === 'navbar-button-events') {
        messagesDiv.classList.add('hide');
        newsDiv.classList.add('hide');
        diaryDiv.classList.add('hide');
        eventDiv.classList.remove('hide');
      } else if (e.target.id === 'navbar-button-diary') {
        messagesDiv.classList.add('hide');
        newsDiv.classList.add('hide');
        diaryDiv.classList.remove('hide');
        eventDiv.classList.add('hide');
        document.getElementById('diary-entries').classList.remove('hide');
        diary.diaryPrintToDom(firebase.auth().currentUser.uid);
      }
    });
  }
};

export default { navbarEvents };
