import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';

// creates a news object an add to firebase
const submitForm = (e) => {
  e.preventDefault();
  const addedNews = {
    title: document.getElementById('news-title').value,
    imgUrl: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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

// prints form to the DOM
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

// Adds event-listeners to the submit button and prints out a form
const addFormEvent = () => {
  const addNewsBtn = document.getElementById('create-news-form');
  addNewsBtn.addEventListener('click', () => {
    addNewsForm();
  });
};

// updates the database with the edits
const submitEdit = (e) => {
  e.preventDefault();
  const entryBtnId = e.target.id.split('.')[1];
  const editedNews = {
    title: document.getElementById(`news-title.${entryBtnId}`).value,
    imgUrl: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpeg',
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

// prints out the form for editing and pre-populates them with previous info
const editNews = (e) => {
  document.getElementById('edit-news-form').classList.remove('hide');
  document.getElementById('news').classList.add('hide');
  const editId = e.target.id.split('.')[1];
  const submitId = e.target.id.split('.')[1];
  const editTitle = document.getElementById(`newsTitle.${editId}`).innerHTML;
  const editUrl = document.getElementById(`newsUrl.${editId}`).href;
  const editSynopsis = document.getElementById(`newsSynopsis.${editId}`).innerHTML;
  let domString = '';
  domString += '<form class="col-6 offset-3" autocomplete = "on">';
  domString += '<div class="inputWithIcon form-group">';
  domString += `<label for="news-title.${editId}">News Title:</label>`;
  domString += `<input id="news-title.${editId}" type="text" class="form-control" value="${editTitle}">`;
  domString += '<i class="fa fa-film fa-lg fa-fw" aria-hidden="true"></i>';
  domString += '</div>';
  domString += '<div class="inputWithIcon form-group">';
  domString += `<label for="news-url.${editId}">Link:</label>`;
  domString += `<input id="news-url.${editId}" type="url" class="form-control" value="${editUrl}" size="30" >`;
  domString += '<i class="fa fa-photo fa-lg fa-fw" aria-hidden="true"></i>';
  domString += '</div>';
  domString += '<div class="inputWithIcon form-group">';
  domString += `<label for="synopsis.${editId}">Synopsis:</label>`;
  domString += `<input id="synopsis.${editId}" type="text" class="form-control" value="${editSynopsis}">`;
  domString += '<i class="fa fa-star-half-full fa-lg fa-fw" aria-hidden="true"></i>';
  domString += '</div>';
  domString += `<button type="submit" id="addNews.${submitId}" class="btn btn-outline-primary">Submit</button>`;
  domString += '</form>';
  util.printToDom('edit-news-form', domString);
  document.getElementById(`addNews.${submitId}`).addEventListener('click', submitEdit);
};

// delete news card function
const deleteNewsEvent = (e) => {
  const newsId = e.target.id.split('.')[1];
  newsData.deleteNews(newsId)
    .then(() => getNews(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('could not delete news', err));
};

// adds event-listener to the edit button
const addBtnEvent = () => {
  const editBtn = document.getElementsByClassName('edit');
  for (let i = 0; i < editBtn.length; i += 1) {
    editBtn[i].addEventListener('click', editNews);
  }
  const deleteNewsButton = document.getElementsByClassName('delete-news');
  for (let j = 0; j < deleteNewsButton.length; j += 1) {
    deleteNewsButton[j].addEventListener('click', deleteNewsEvent);
  }
};

// prints the news card to the DOM
const newsDomStringBulder = (news) => {
  let domString = '<div class = "container">';
  domString += '<div class="container-news d-flex hide">';
  news.forEach((newsItem) => {
    domString += '<div class="content container">';
    domString += `<img src="${newsItem.imgUrl}" id="newsImgUrl.${newsItem.id}" class="card-img-top">`;
    domString += '<div class = "box">';
    domString += `<h2>0${news.indexOf(newsItem)}</h2>`;
    domString += `<h5 id="newsTitle.${newsItem.id}" class="cardTitle">${newsItem.title}</h5>`;
    domString += `<p id="newsSynopsis.${newsItem.id}" class="card-text">${newsItem.synopsis}</p>`;
    domString += `<a href="${newsItem.url}" id="newsUrl.${newsItem.id}">Read more</a>`;
    domString += '</div>';
    domString += '<div class="footer">';
    domString += `<button id="editNewsForm.${newsItem.id}" class="btn btn-outline-info edit">Edit</button>`;
    domString += `<button id="deleteNews.${newsItem.id}" class="btn btn-outline-danger delete-news">X</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '</div>';
  domString += '<button type="submit" id="create-news-form" class="btn btn-outline-danger">Add Article</button>';
  util.printToDom('news', domString);
  addFormEvent();
  addBtnEvent();
};

// Recieves an array of news by UID from the promise call
const getNews = (uid) => {
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
