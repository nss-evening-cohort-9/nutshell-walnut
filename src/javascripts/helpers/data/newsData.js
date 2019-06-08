import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getNewsByUid = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/news.json`)
    .then((response) => {
      const newsResult = response.data;
      const news = [];
      Object.keys(newsResult).forEach((newsPost) => {
        newsResult[newsPost].id = newsPost;
        news.push(newsResult[newsPost]);
      });
      console.error(news);
      resolve(news);
    })
    .catch(err => reject(err));
});

export default { getNewsByUid };
