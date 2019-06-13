import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const addNewArticle = newNews => axios.post(`${firebaseUrl}/news.json`, newNews);

const getNewsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      // console.error(response);
      const newsResult = response.data;
      const news = [];
      Object.keys(newsResult).forEach((newsPost) => {
        newsResult[newsPost].id = newsPost;
        news.push(newsResult[newsPost]);
      });
      resolve(news);
      // console.error(news);
    })
    .catch(err => reject(err));
});

export default { getNewsByUid, addNewArticle };
