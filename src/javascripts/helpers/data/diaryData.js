import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const addNewEntry = newEntry => axios.post(`${firebaseUrl}/diary.json`, newEntry);

const getDiariesByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/diary.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const diaryResults = results.data;
      const diaryEntries = [];
      Object.keys(diaryResults).forEach((entryId) => {
        diaryResults[entryId].id = entryId;
        diaryEntries.push(diaryResults[entryId]);
      });
      resolve(diaryEntries);
    })
    .catch(err => reject(err));
});

export default { getDiariesByUid, addNewEntry };
