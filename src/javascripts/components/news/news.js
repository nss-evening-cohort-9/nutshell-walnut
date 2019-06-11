import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';

const addNewsForm = () => {
  let domString = '';
  domString += '<form class="col-6 offset-3">';
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
};

const addFormEvent = () => {
  document.getElementById('create-news-form').addEventListener('click', addNewsForm);
};

const newsDomStringBulder = (news) => {
  let domString = '<div class = "container container-news d-flex hide">';
  news.forEach((newsItem) => {
    domString += '<div class = "box card">';
    domString += '<div class = "content">';
    domString += '<h2>01</h2>';
    domString += `<div class="card-title">${newsItem.title}</div>`;
    domString += `<p class="">${newsItem.synopsis}</p>`;
    domString += `<a href="${newsItem.url}">Read more</a>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '<button type="submit" id="create-news-form" class="btn btn-outline-danger">Add Article</button>';
  util.printToDom('news', domString);
  addFormEvent();
};


const getNews = (uid) => {
  newsData.getNewsByUid(uid)
    .then((news) => {
      newsDomStringBulder(news);
    })
    .catch(err => console.error('no news read', err));
};

export default { newsDomStringBulder, getNews, addFormEvent };
