import firebase from 'firebase/app';
import 'firebase/auth';
import auth from './components/auth/auth';
import navBar from './helpers/data/authData';
import userLogout from './components/myNavbar/myNavbar';
import apiKeys from './helpers/apiKeys.json';
import events from './components/events/events';
import messages from './components/messages/messages';
import news from './components/news/news';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  navBar.checkLoginStatus();
  auth.authBuilder();
  userLogout.navbarEvents();
  messages.messageStringBuilder();
  messages.messageEvents();
  news.addEditBtnEvent();
  events.getEvents();
  events.addEvents();
};

init();
