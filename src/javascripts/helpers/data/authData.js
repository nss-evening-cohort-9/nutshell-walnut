import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = document.getElementById('auth');
const newsNavbar = document.getElementById('navbar-button-news');
const eventsNavbar = document.getElementById('navbar-button-events');
const diaryNavbar = document.getElementById('navbar-button-diary');
const messagesNavbar = document.getElementById('navbar-button-messages');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const newsTab = document.getElementById('news');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      newsNavbar.classList.remove('hide');
      eventsNavbar.classList.remove('hide');
      diaryNavbar.classList.remove('hide');
      messagesNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      newsTab.classList.remove('hide');
    } else {
      authDiv.classList.remove('hide');
      newsNavbar.classList.add('hide');
      eventsNavbar.classList.add('hide');
      diaryNavbar.classList.add('hide');
      messagesNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      newsTab.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
