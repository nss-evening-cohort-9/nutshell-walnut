import firebase from 'firebase/app';
import 'firebase/auth';

import diary from '../diary/diary';

const navbarEvents = () => {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener('click', (e) => {
      if (e.target.id === 'navbar-button-logout') {
        firebase.auth().signOut()
          .then(() => {
            console.error('bye');
          })
          .catch(err => console.error('no', err));
      } else if (e.target.id === 'navbar-button-diary') {
        e.preventDefault();
        document.getElementById('diary-entries').classList.remove('hide');
        diary.diaryPrintToDom(firebase.auth().currentUser.uid);
      }
    });
  }
};

export default { navbarEvents };
