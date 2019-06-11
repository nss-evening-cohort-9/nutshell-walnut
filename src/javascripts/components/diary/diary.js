import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';

import diaryData from '../../helpers/data/diaryData';
import { resolve } from 'path';

const diaryPrintToDom = (uid) => {
  diaryData.getDiariesByUid(uid).then((entries) => {
    let domString = '';
    entries.forEach((entry) => {
      domString += `<h3>${entry.title}</h3>`;
      domString += `<h3>${entry.date}</h3>`;
      domString += `<h3>${entry.entryText}</h3>`;
      domString += `<button id="edit-btn.${entry.id}" class="edit-btn btn btn-warning">Edit Entry</button>`;
      domString += `<button id="delete-btn.${entry.id}" class="delete-btn btn btn-dark">Delete Entry</button>`;
    });
    domString += '<button id="display-entry-form" class="btn btn-danger">New Entry</button>';
    util.printToDom('diary-entries', domString);
    document.getElementById('display-entry-form').addEventListener('click', showEntryForm); // eslint-disable-line no-use-before-define
    document.getElementById('new-diary-entry').classList.add('hide');
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
  diaryData.getDiariesByUid(newEntry.uid);
  diaryPrintToDom(newEntry.uid);
  document.getElementById('diary-entries').classList.remove('hide');
};

const showEntryForm = () => {
  document.getElementById('diary-entries').classList.add('hide');
  document.getElementById('display-entry-form').classList.add('hide');
  document.getElementById('new-diary-entry').classList.remove('hide');
  document.getElementById('save-new-entry').addEventListener('click', createNewEntry);
};

// const openEditEntry = () => {
//         <form class="col-6 offset-3">
//         <div class="form-group">
//         <label for="edit-area">Edit Entry</label>
//         <input type="text" class="form-control" id="entry-title" placeholder="Title">
//         </div> </form>
// };

const saveEditEntry = (e) => {
  const newEntryText = document.getElementById('edit-form').value;
  const entryId = e.target.id.split('.')[1];
  diaryData.getDiariesByUid(firebase.auth().currentUser.uid)
    .then((entries) => {
      entries.forEach((entry) => {
        if (entry.id === entryId) {
          const entryKeys = Object.keys(entry);
          entryKeys.entryText = newEntryText;
          diaryData.editDiaryEntry(entryId, entryKeys);
        }
      })
    })
    .catch(err => console.error('could not edit entry', err));
};

const addEditEvents = () => {
  const editBtns = document.getElementsByClassName('edit-btn');
  for (let i = 0; i < editBtns.length; i += 1) {
    editBtns[i].addEventListener('click', openEditEntry);
  }
};


export default { diaryPrintToDom, createNewEntry };
