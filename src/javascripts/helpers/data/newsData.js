import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getNewsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      console.error(response);
      const newsResult = response.data;
      const news = [];
      Object.keys(news).forEach((newsPost) => {
        news[newsPost].id = newsPost;
        news.push(newsResult[newsPost]);
      });
      resolve(news);
    })
    .catch(err => reject(err));
});

export default { getNewsByUid };
