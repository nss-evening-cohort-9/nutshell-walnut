import firebase from 'firebase/app';
import 'firebase/auth';
import auth from './components/auth/auth';
import navBar from './helpers/data/authData';
import userLogout from './components/myNavbar/myNavbar';
import apiKeys from './helpers/apiKeys.json';
import events from './components/events/events';
import messages from './components/messages/messages';
<<<<<<< HEAD
import news from './components/news/news';
=======


>>>>>>> master
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  navBar.checkLoginStatus();
  auth.authBuilder();
  userLogout.navbarEvents();
  messages.messageStringBuilder();
  userLogout.navbarEvents();
<<<<<<< HEAD
  news.addEditBtnEvent();
=======
  events.getEvents();
  events.addEvents();
>>>>>>> master
};

init();
