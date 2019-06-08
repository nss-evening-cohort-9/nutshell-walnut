// import firebase from 'firebase/app';
// import 'firebase/auth';
import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';

const newsTabEvents = () => {
  const newsTab = document.getElementById('news');
  newsTab.classList.add('hide');
  document.getElementById('navbar-button-events').addEventListener('click', (e) => {
    e.preventDefault();
    newsTab.classList.remove('hide');
  });
};

const newsDomStringBulder = () => {
  let domString = '<div class = "container d-flex hide">';
  newsData.getNewsByUid().then((newsResp) => {
    newsResp.forEach((newsItem) => {
      domString += '<div class = "card">';
      domString += `<div class="card-header">${newsItem.title}</div>`;
      domString += '</div>';
    });
    util.printToDom('news', domString);
  })
    .catch(err => console.error('news not reading', err));
  newsTabEvents();
};

export default { newsDomStringBulder };
