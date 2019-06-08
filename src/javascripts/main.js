import firebase from 'firebase/app';
import 'firebase/auth';

import auth from './components/auth/auth';

import navBar from './helpers/data/authData';
import logout from './components/myNavbar/myNavbar';

import apiKeys from './helpers/apiKeys.json';
import news from './components/news/news';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  navBar.checkLoginStatus();
  auth.authBuilder();
  news.newsDomStringBulder();
  logout.navbarEvents();
};

init();
