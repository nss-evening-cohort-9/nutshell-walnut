import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';

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
  util.printToDom('news', domString);
};

const getNews = (uid) => {
  newsData.getNewsByUid(uid)
    .then((news) => {
      newsDomStringBulder(news);
    })
    .catch(err => console.error('no news read', err));
};

export default { newsDomStringBulder, getNews };
