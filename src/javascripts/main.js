import firebase from 'firebase/app';
import 'firebase/auth';
import auth from './components/auth/auth';
import navBar from './helpers/data/authData';
import logout from './components/myNavbar/myNavbar';
import apiKeys from './helpers/apiKeys.json';
import messageData from './helpers/data/messagesData';
import events from './components/events/events';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  navBar.checkLoginStatus();
  auth.authBuilder();
  messageData.getMessages();
  logout.navbarEvents();
  events.getEvents();
  events.addEvents();
};

init();
