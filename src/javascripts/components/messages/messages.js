import messagesData from '../../helpers/data/messagesData';
import util from '../../helpers/util';

const messageStringBuilder = () => {
  messagesData.getMessages().then((messageResp) => {
    console.error(messageResp);
    let domString = '';
    domString += '<div class="container">';
    messageResp.forEach((message) => {
      domString += '<div class="card">';
      domString += `<h3>${message.username}:</h3>`;
      domString += `<h5>${message.messageText}</h5>`;
      domString += `<button type="submit" id="delete${message.id}" class="btn btn-outline-danger trashBtn">delete</button>`;
      domString += `<button type="submit" id="edit${message.id}" class="btn btn-outline-warning changeBtn">edit message</button>`;
      domString += '</div>';
    });
    domString += '</div>';
    util.printToDom('innerMessages', domString);
  }).catch(err => console.error('could not get messages', err));
};

export default { messageStringBuilder };
