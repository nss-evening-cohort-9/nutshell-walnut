// import firebase from 'firebase/app';
// import 'firebase/auth';

import util from '../../helpers/util';

import entryData from '../../helpers/data/diaryData';

const diaryPrintToDom = (uid) => {
  entryData.getDiariesByUid(uid).then((entries) => {
    let domString = '';
    console.error(entries);
    entries.forEach((entry) => {
      domString += `<h3>${entry.title}</h3>`;
      domString += `<h3>${entry.date}</h3>`;
      domString += `<h3>${entry.entryText}</h3>`;
    });
    util.printToDom('diary-entries', domString);
  })
    .catch(err => console.error('could not get diary entries', err));
};

// const createNewEntry = () => {
//   const newEntry = {
//     date: document.getElementById
//     title:
//     entryText:
//     uid:
//   };
// };
export default { diaryPrintToDom };
