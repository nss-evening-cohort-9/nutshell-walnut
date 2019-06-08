import firebase from 'firebase/app';
import 'firebase/auth';

import auth from './components/auth/auth';

import apiKeys from './helpers/apiKeys.json';
import news from './components/news/news';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  auth.authBuilder();
  news.newsDomStringBulder();
};

init();
