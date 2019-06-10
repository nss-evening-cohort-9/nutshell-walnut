import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';

const newsDomStringBulder = (news) => {
  console.error(news);
  let domString = '<div class = "container d-flex hide">';
  news.forEach((newsItem) => {
    domString += '<div class = "card">';
    domString += `<div class="card-header">${newsItem.title}</div>`;
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
