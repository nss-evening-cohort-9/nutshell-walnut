import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';

import diaryData from '../../helpers/data/diaryData';

const saveEditEntry = (e) => {
  const newEntryText = document.getElementById('edit-area').value;
  console.error(e.target.id);
  const entryId = e.target.id.split('.')[1];
  diaryData.getDiariesByUid(firebase.auth().currentUser.uid)
    .then((entries) => {
      entries.forEach((entry) => {
        if (entry.id === entryId) {
          const currentEntry = entry;
          currentEntry.entryText = newEntryText;
          console.error(currentEntry);
          diaryData.editDiaryEntry(entryId, currentEntry);
        }
      });
    })
    .catch(err => console.error('could not edit entry', err));
};


const openEditEntry = (e) => {
  const entryId = e.target.id.split('.')[1];
  const entryText = document.getElementById(entryId).innerHTML;
  let domString = '';
  domString += '<form class="col-6 offset-3">';
  domString += '<div id="edit-form" class="form-group">';
  domString += '<label for="edit-area">Edit Entry</label>';
  domString += `<input type="text" class="form-control" id="edit-area" value="${entryText}">`;
  domString += '</div> </form>';
  domString += `<button id="save-entry-btn.${entryId}" class="btn btn-info">Save Entry</button>`;
  util.printToDom('diary-entries', domString);
  document.getElementById(`save-entry-btn.${entryId}`).addEventListener('click', saveEditEntry);
};

const addEditEvents = () => {
  const editBtns = document.getElementsByClassName('edit-btn');
  for (let i = 0; i < editBtns.length; i += 1) {
    editBtns[i].addEventListener('click', openEditEntry);
  }
};

const diaryPrintToDom = (uid) => {
  diaryData.getDiariesByUid(uid).then((entries) => {
    let domString = '';
    entries.forEach((entry) => {
      domString += `<h3>${entry.title}</h3>`;
      domString += `<h3>${entry.date}</h3>`;
      domString += `<h3 id="${entry.id}">${entry.entryText}</h3>`;
      domString += `<button id="edit-btn.${entry.id}" class="edit-btn btn btn-warning">Edit Entry</button>`;
      domString += `<button id="delete-btn.${entry.id}" class="delete-btn btn btn-dark">Delete Entry</button>`;
    });
    domString += '<button id="display-entry-form" class="btn btn-danger">New Entry</button>';
    util.printToDom('diary-entries', domString);
    document.getElementById('display-entry-form').addEventListener('click', showEntryForm); // eslint-disable-line no-use-before-define
    document.getElementById('new-diary-entry').classList.add('hide');
    addEditEvents();
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

export default { diaryPrintToDom, createNewEntry };
