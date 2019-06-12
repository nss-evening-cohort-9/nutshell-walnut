import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import messagesData from '../../helpers/data/messagesData';
import util from '../../helpers/util';

// const deleteMessageEvent = (e) => {
//   const messageId = e.target.id;
//   messagesData.deleteMessage(messageId)
//     .then(() => getFriends(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
//     .catch(err => console.error('no deletion', err));
// };

const messageStringBuilder = () => {
  messagesData.getMessages().then((messageResp) => {
    console.error(messageResp);
    let domString = '';
    domString += '<div class="container">';
    messageResp.forEach((message) => {
      domString += '<div class="card">';
      domString += `<h3>${message.username}:</h3>`;
      domString += `<h5>${message.messageText}</h5>`;
      domString += `<button type="submit" id="${message.id}" class="btn btn-outline-danger trashBtn">delete</button>`;
      domString += `<button type="submit" id="edit.${message.id}" class="btn btn-outline-warning changeBtn">edit message</button>`;
      domString += '</div>';
    });
    domString += '</div>';
    util.printToDom('innerMessages', domString);
  }).catch(err => console.error('could not get messages', err));
};

const createNewMessage = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const newMessage = {
      username: 'Dem Boiz!',
      messageText: document.getElementById('textInput').value,
      uid: firebase.auth().currentUser.uid,
    };
    messagesData.addNewMessage(newMessage)
      .then(() => {
        document.getElementById('textInput').value = '';
        messageStringBuilder();
      })
      .catch(err => console.error('no new message for you', err));
  }
};

const newMessageBtn = () => {
  $('#textInput').keypress(createNewMessage);
  const deleteButtons = document.getElementsByClassName('trashBtn');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteMessageEvent);
  }
};


export default { messageStringBuilder, newMessageBtn };
