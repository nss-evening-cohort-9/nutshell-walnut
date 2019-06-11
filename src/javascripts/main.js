import firebase from 'firebase/app';
import 'firebase/auth';
import auth from './components/auth/auth';
import navBar from './helpers/data/authData';
import logout from './components/myNavbar/myNavbar';
import apiKeys from './helpers/apiKeys.json';
import messages from './components/messages/messages';
// import news from './components/news/news';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  navBar.checkLoginStatus();
  auth.authBuilder();
  messages.messageStringBuilder();
  logout.navbarEvents();
};

init();
