// import firebase from 'firebase/app';
// import 'firebase/auth';
import util from '../../helpers/util';
import newsData from '../../helpers/data/newsData';


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
};

export default { newsDomStringBulder };
