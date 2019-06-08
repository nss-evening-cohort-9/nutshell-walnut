import firebase from 'firebase/app';
import 'firebase/auth';
import auth from './components/auth/auth';
import apiKeys from './helpers/apiKeys.json';
import messageData from './helpers/data/messagesData';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  auth.authBuilder();
  messageData.getMessages();
};

init();
