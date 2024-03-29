import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';

import diaryData from '../../helpers/data/diaryData';

const deleteEntry = (e) => {
  const entryId = e.target.id.split('.')[1];
  diaryData.deleteEntry(entryId)
    .then(() => diaryPrintToDom(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const saveEditEntry = (e) => {
  const newEntryText = document.getElementById('edit-area').value;
  const entryId = e.target.id.split('.')[1];
  diaryData.getDiariesByUid(firebase.auth().currentUser.uid)
    .then((entries) => {
      entries.forEach((entry) => {
        if (entry.id === entryId) {
          const currentEntry = entry;
          currentEntry.entryText = newEntryText;
          diaryData.editDiaryEntry(entryId, currentEntry);
        }
      });
    })
    .catch(err => console.error('could not edit entry', err));
  setTimeout(() => { diaryPrintToDom(firebase.auth().currentUser.uid); }, 500); // eslint-disable-line no-use-before-define
};

const openEditEntry = (e) => {
  const entryId = e.target.id.split('.')[1];
  const entryText = document.getElementById(entryId).innerHTML;
  let domString = '';
  domString += '<form id="edit-form" class="col-6 offset-3">';
  domString += '<div class="form-group">';
  domString += '<label for="edit-area">Edit Entry</label>';
  domString += `<input type="text" class="form-control" id="edit-area" value="${entryText}">`;
  domString += '</div> </form>';
  domString += `<button id="save-entry-btn.${entryId}" class="btn btn-info">Save Entry</button>`;
  util.printToDom('diary-entries', domString);
  document.getElementById(`save-entry-btn.${entryId}`).addEventListener('click', saveEditEntry);
};

const addEvents = () => {
  const editBtns = document.getElementsByClassName('edit-btn');
  for (let i = 0; i < editBtns.length; i += 1) {
    editBtns[i].addEventListener('click', openEditEntry);
  }
  const deleteBtns = document.getElementsByClassName('delete-btn');
  for (let i = 0; i < deleteBtns.length; i += 1) {
    deleteBtns[i].addEventListener('click', deleteEntry);
  }
};

const diaryPrintToDom = (uid) => {
  diaryData.getDiariesByUid(uid).then((entries) => {
    let domString = '';
    entries.forEach((entry) => {
      domString += '<div class="card" style="width: 18rem;">';
      domString += '<div class="card-body">';
      domString += `<h3>${entry.title}</h3>`;
      domString += `<h3>${entry.date}</h3>`;
      domString += `<h3 id="${entry.id}">${entry.entryText}</h3>`;
      domString += `<button id="edit-btn.${entry.id}" class="edit-btn btn btn-warning">Edit Entry</button>`;
      domString += `<button id="delete-btn.${entry.id}" class="delete-btn btn btn-dark">Delete Entry</button>`;
      domString += '</div>';
      domString += '</div>';
    });
    domString += '<button id="display-entry-form" class="btn btn-danger">New Entry</button>';
    util.printToDom('diary-entries', domString);
    document.getElementById('display-entry-form').addEventListener('click', showEntryForm); // eslint-disable-line no-use-before-define
    document.getElementById('new-diary-entry').classList.add('hide');
    addEvents();
  })
    .catch(err => console.error('could not get diary entries', err));
};

const createNewEntry = () => {
  const newEntry = {
    date: document.getElementById('entry-date').value,
    title: document.getElementById('entry-title').value,
    entryText: document.getElementById('entry-text').value,
    uid: firebase.auth().currentUser.uid,
  };
  diaryData.addNewEntry(newEntry);
  diaryData.getDiariesByUid(newEntry.uid)
    .then(() => {
      diaryPrintToDom(newEntry.uid);
      document.getElementById('diary-entries').classList.remove('hide');
    })
    .catch(err => console.error('could not get diary entries', err));
};

const showEntryForm = () => {
  document.getElementById('diary-entries').classList.add('hide');
  document.getElementById('display-entry-form').classList.add('hide');
  document.getElementById('new-diary-entry').classList.remove('hide');
  document.getElementById('save-new-entry').addEventListener('click', createNewEntry);
};

export default { diaryPrintToDom, createNewEntry };
