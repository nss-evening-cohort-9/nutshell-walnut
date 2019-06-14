import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';

const submitForm = (e) => {
  e.preventDefault();
  const addedNews = {
    title: document.getElementById('news-title').value,
    url: document.getElementById('news-url').value,
    synopsis: document.getElementById('synopsis').value,
    uid: firebase.auth().currentUser.uid,
  };
  newsData.addNewArticle(addedNews)
    .then(() => {
      document.getElementById('add-news-form').classList.add('hide');
      document.getElementById('news-title').value = '';
      document.getElementById('news-url').value = '';
      document.getElementById('synopsis').value = '';
      getNews(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('articles could not update', err));
};

const addNewsForm = () => {
  let domString = '';
  domString += '<form class="col-6 offset-3" autocomplete = "on">';
  domString += '<div class="inputWithIcon form-group">';
  domString += '<label for="news-title">News Title:</label>';
  domString += '<input id="news-title" type="text" class="form-control" placeholder="News article title">';
  domString += '<i class="fa fa-film fa-lg fa-fw" aria-hidden="true"></i>';
  domString += '</div>';
  domString += '<div class="inputWithIcon form-group">';
  domString += '<label for="news-url">Link:</label>';
  domString += '<input id="news-url" type="url" class="form-control" placeholder="https://example.com" size="30" >';
  domString += '<i class="fa fa-photo fa-lg fa-fw" aria-hidden="true"></i>';
  domString += '</div>';
  domString += '<div class="inputWithIcon form-group">';
  domString += '<label for="synopsis">Synopsis:</label>';
  domString += '<input id="synopsis" type="text" class="form-control" placeholder="synopsis">';
  domString += '<i class="fa fa-star-half-full fa-lg fa-fw" aria-hidden="true"></i>';
  domString += '</div>';
  domString += '<button type="submit" id="addNews" class="btn btn-outline-primary">Submit</button>';
  domString += '</form>';
  util.printToDom('add-news-form', domString);
  document.getElementById('news').classList.add('hide');
  document.getElementById('addNews').addEventListener('click', submitForm);
};

const addFormEvent = () => {
  const addNewsBtn = document.getElementById('create-news-form');
  addNewsBtn.addEventListener('click', () => {
    addNewsForm();
  });
};

const submitEdit = (e) => {
  e.preventDefault();
  const entryBtnId = e.target.id.split('.')[1];
  const editedNews = {
    title: document.getElementById(`news-title.${entryBtnId}`).value,
    url: document.getElementById(`news-url.${entryBtnId}`).value,
    synopsis: document.getElementById(`synopsis.${entryBtnId}`).value,
    uid: firebase.auth().currentUser.uid,
  };
  newsData.getNewsByUid(firebase.auth().currentUser.uid)
    .then((news) => {
      news.forEach((newsItem) => {
        if (newsItem.id === entryBtnId) {
          newsData.postEditNews(entryBtnId, editedNews);
        }
      });
    })
    .catch(err => console.error('could not update', err));
  setTimeout(() => { getNews(firebase.auth().currentUser.uid); }, 500); // eslint-disable-line no-use-before-define
  document.getElementById('edit-news-form').classList.add('hide');
};

const editNews = (e) => {
  document.getElementById('news').classList.add('hide');
  const editId = e.target.id.split('.')[1];
  const submitId = e.target.id.split('.')[1];
  const editTitle = document.getElementById('newsTitle').innerHTML;
  const editUrl = document.getElementById('newsUrl').href;
  const editSynopsis = document.getElementById('newsSynopsis').innerHTML;
  let domString = '';
  domString += '<form class="col-6 offset-3" autocomplete = "on">';
  domString += '<div class="inputWithIcon form-group">';
  domString += '<label for="news-title">News Title:</label>';
  domString += `<input id="news-title.${editId}" type="text" class="form-control" value="${editTitle}">`;
  domString += '<i class="fa fa-film fa-lg fa-fw" aria-hidden="true"></i>';
  domString += '</div>';
  domString += '<div class="inputWithIcon form-group">';
  domString += '<label for="news-url">Link:</label>';
  domString += `<input id="news-url.${editId}" type="url" class="form-control" value="${editUrl}" size="30" >`;
  domString += '<i class="fa fa-photo fa-lg fa-fw" aria-hidden="true"></i>';
  domString += '</div>';
  domString += '<div class="inputWithIcon form-group">';
  domString += '<label for="synopsis">Synopsis:</label>';
  domString += `<input id="synopsis.${editId}" type="text" class="form-control" value="${editSynopsis}">`;
  domString += '<i class="fa fa-star-half-full fa-lg fa-fw" aria-hidden="true"></i>';
  domString += '</div>';
  domString += `<button type="submit" id="addNews.${submitId}" class="btn btn-outline-primary">Submit</button>`;
  domString += '</form>';
  util.printToDom('edit-news-form', domString);
  document.getElementById(`addNews.${submitId}`).addEventListener('click', submitEdit);
};


const addBtnEvent = () => {
  const editBtn = document.getElementsByClassName('edit');
  for (let i = 0; i < editBtn.length; i += 1) {
    editBtn[i].addEventListener('click', editNews);
  }
};

const newsDomStringBulder = (news) => {
  let domString = '<div class = "container container-news d-flex hide">';
  news.forEach((newsItem) => {
    domString += '<div class = "box card">';
    domString += '<div class = "content">';
    domString += `<h2>0${news.indexOf(newsItem)}</h2>`;
    domString += `<div id="newsTitle" class="card-title">${newsItem.title}</div>`;
    domString += `<p id="newsSynopsis" class="">${newsItem.synopsis}</p>`;
    domString += `<a href="${newsItem.url}" id="newsUrl">Read more</a>`;
    domString += `<button id="editNewsForm.${newsItem.id}" class="btn btn-outline-info edit">Edit</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '<button type="submit" id="create-news-form" class="btn btn-outline-danger">Add Article</button>';
  util.printToDom('news', domString);
  addFormEvent();
  addBtnEvent();
};

const getNews = (uid) => {
  console.error('hey');
  newsData.getNewsByUid(uid)
    .then((news) => {
      newsDomStringBulder(news);
      document.getElementById('news').classList.remove('hide');
      return news;
    })
    .catch(err => console.error('no news read', err));
};

export default {
  newsDomStringBulder,
  getNews,
  addFormEvent,
};
