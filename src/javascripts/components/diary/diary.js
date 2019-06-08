import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';

import diaryData from '../../helpers/data/diaryData';

const showEntryForm = () => {
  document.getElementById('diary-entries').classList.add('hide');
  document.getElementById('new-diary-entry').classList.remove('hide');
};

const diaryPrintToDom = (uid) => {
  diaryData.getDiariesByUid(uid).then((entries) => {
    let domString = '';
    console.error(entries);
    entries.forEach((entry) => {
      domString += `<h3>${entry.title}</h3>`;
      domString += `<h3>${entry.date}</h3>`;
      domString += `<h3>${entry.entryText}</h3>`;
    });
    domString += '<button id="display-entry-form" class="btn btn-danger">New Entry</button>';
    util.printToDom('diary-entries', domString);
    document.getElementById('display-entry-form').addEventListener('click', showEntryForm);
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
  diaryPrintToDom(newEntry.uid);
};

export default { diaryPrintToDom, createNewEntry };
