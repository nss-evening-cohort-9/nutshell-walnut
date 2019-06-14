import firebase from 'firebase/app';
import 'firebase/auth';
import news from '../news/news';

import diaryPrint from '../diary/diary';

const messagesDiv = document.getElementById('messages');
const newsDiv = document.getElementById('news');
const diaryDiv = document.getElementById('diary-entries');
const eventDiv = document.getElementById('events');

const navbarEvents = () => {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.id === 'navbar-button-logout') {
        e.preventDefault();
        firebase.auth().signOut()
          .then(() => {
            document.getElementById('add-username').classList.add('hide');
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
        news.getNews(firebase.auth().currentUser.uid);
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
        diaryPrint.diaryPrintToDom(firebase.auth().currentUser.uid);
      }
    });
  }
  // news.getNews(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
};

export default { navbarEvents };
