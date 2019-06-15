import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import messagesData from '../../helpers/data/messagesData';
import usersData from '../../helpers/data/usersData';
import util from '../../helpers/util';

const getText = (element) => {
  const firstTag = element[0].firstChild.nodeName;
  const keyTag = new RegExp(firstTag === '#text' ? '<br' : `</${firstTag}`, 'i');
  const tmp = document.createElement('p');
  tmp.innerHTML = element[0].innerHTML.replace(/<[^>]+>/g, m => (keyTag.test(m) ? '{ß®}' : '')).replace(/{ß®}$/, '');
  return tmp.innerText.replace(/{ß®}/g, '\n');
};

const saveMessage = (e) => {
  e.preventDefault();
  const rawMessage = $(e.target).closest('.messageCard').find('.message');
  const newMessageText = getText(rawMessage);
  const messageId = e.target.id.split('.')[1];
  messagesData.getMessages()
    .then((messages) => {
      messages.forEach((message) => {
        if (message.id === messageId) {
          const currentMessage = message;
          currentMessage.messageText = newMessageText;
          messagesData.editMessage(messageId, currentMessage);
          util.handleSaveBtn(e);
        }
      });
    })
    .catch(err => console.error('could not edit message', err));
};

const editMessage = (e) => {
  e.preventDefault();
  const myId = firebase.auth().currentUser.uid;
  if (e.target.classList[0] === myId) {
    util.handleEditBtn(e);
  }
};

const messageStringBuilder = () => {
  messagesData.getMessages().then((messageResp) => {
    let domString = '';
    domString += '<div class="container">';
    messageResp.forEach((message) => {
      domString += `<div id="${message.id}" class="messageCard card">`;
      domString += `<h5>${message.username}:</h5>`;
      domString += `<p class="message">${message.messageText}</p>`;
      domString += `<button type="submit" id="delete.${message.id}" class="${message.uid} btn btn-outline-danger messageBtn trashBtn">delete</button>`;
      domString += `<button type="submit" id="edit.${message.id}" class="${message.uid} btn btn-outline-warning messageBtn changeBtn">edit message</button>`;
      domString += `<button type="submit" id="save.${message.id}" class="${message.uid} btn btn-outline-danger messageBtn saveBtn hide">save</button>`;
      domString += '</div>';
    });
    domString += '</div>';
    util.printToDom('innerMessages', domString);
    $('.trashBtn').click(deleteMessageEvent); // eslint-disable-line no-use-before-define
    $('.changeBtn').click(editMessage);
    $('.saveBtn').click(saveMessage);
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
  const myId = firebase.auth().currentUser.uid;
  getUsername(myId);
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

export default {
  messageStringBuilder,
  messageEvents,
  editMessage,
  saveMessage,
};
