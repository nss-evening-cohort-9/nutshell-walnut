import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import messagesData from '../../helpers/data/messagesData';
import util from '../../helpers/util';

const editMessageEvent = (e) => {
  console.error('editing');
  const myId = firebase.auth().currentUser.uid;
  if (e.target.classList[0] === myId) {
    const messageId = e.target.id.split('.')[1];
    console.error(messageId);
    messagesData.deleteMessage(messageId)
      .then(() => messageStringBuilder()) // eslint-disable-line no-use-before-define
      .catch(err => console.error('no deletion', err));
  }
};

const messageStringBuilder = () => {
  messagesData.getMessages().then((messageResp) => {
    console.error(messageResp);
    let domString = '';
    domString += '<div class="container">';
    messageResp.forEach((message) => {
      domString += '<div class="card">';
      domString += `<h3>${message.username}:</h3>`;
      domString += `<h5>${message.messageText}</h5>`;
      domString += `<button type="submit" id="delete.${message.id}" class="${message.uid} btn btn-outline-danger trashBtn">delete</button>`;
      domString += `<button type="submit" id="edit.${message.id}" class="${message.uid} btn btn-outline-warning changeBtn">edit message</button>`;
      domString += '</div>';
    });
    domString += '</div>';
    util.printToDom('innerMessages', domString);
    $('.trashBtn').click(deleteMessageEvent); // eslint-disable-line no-use-before-define
    $('.changeBtn').click(editMessageEvent);
  }).catch(err => console.error('could not get messages', err));
};

const deleteMessageEvent = (e) => {
  const myId = firebase.auth().currentUser.uid;
  if (e.target.classList[0] === myId) {
    const messageId = e.target.id.split('.')[1];
    messagesData.deleteMessage(messageId)
      .then(() => messageStringBuilder()) // eslint-disable-line no-use-before-define
      .catch(err => console.error('no deletion', err));
  }
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

const messageEvents = () => {
  $('#textInput').keypress(createNewMessage);
};


export default { messageStringBuilder, messageEvents };
