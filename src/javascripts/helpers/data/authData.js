import firebase from 'firebase/app';
import 'firebase/auth';

import usersData from './usersData';

const authDiv = document.getElementById('auth');
const newsNavbar = document.getElementById('navbar-button-news');
const eventsNavbar = document.getElementById('navbar-button-events');
const diaryNavbar = document.getElementById('navbar-button-diary');
const messagesNavbar = document.getElementById('navbar-button-messages');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      usersData.getUsers()
        .then((users) => {
          const userObjects = users.data;
          const usersArray = Object.values(userObjects);
          const matchingUser = usersArray.find(u => u.uid === user.uid);
          if (matchingUser === undefined) {
            document.getElementById('add-username').classList.remove('hide');
            authDiv.classList.add('hide');
            document.getElementById('add-username-btn').addEventListener('click', () => {
              const userName = document.getElementById('username-form').value;
              const userId = firebase.auth().currentUser.uid;
              const userObject = {
                username: userName,
                uid: userId,
              };
              usersData.addUsername(userObject)
                .then(() => {
                  authDiv.classList.add('hide');
                  newsNavbar.classList.remove('hide');
                  eventsNavbar.classList.remove('hide');
                  diaryNavbar.classList.remove('hide');
                  messagesNavbar.classList.remove('hide');
                  authNavbar.classList.add('hide');
                  logoutNavbar.classList.remove('hide');
                  document.getElementById('username-form').value = '';
                  document.getElementById('add-username').classList.add('hide');
                })
                .catch(error => console.error('could not add user', error));
            });
          } else {
            authDiv.classList.add('hide');
            newsNavbar.classList.remove('hide');
            eventsNavbar.classList.remove('hide');
            diaryNavbar.classList.remove('hide');
            messagesNavbar.classList.remove('hide');
            authNavbar.classList.add('hide');
            logoutNavbar.classList.remove('hide');
            document.getElementById('username-form').value = '';
            document.getElementById('add-username').classList.add('hide');
          }
        })
        .catch(error => console.error('could not get users array', error));
    } else {
      authDiv.classList.remove('hide');
      newsNavbar.classList.add('hide');
      eventsNavbar.classList.add('hide');
      diaryNavbar.classList.add('hide');
      messagesNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
