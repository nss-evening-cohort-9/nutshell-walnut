import $ from 'jquery';

const printToDom = (divId, textToPrint) => {
  const selectDiv = document.getElementById(divId);
  selectDiv.innerHTML = textToPrint;
};

const handleEditBtn = (e) => {
  const messageCard = $(e.target).closest('.messageCard').find('.message');
  console.error(messageCard);
  const saveBtn = $(e.target.parentElement).closest('div').find('.saveBtn');
  const editBtn = $(e.target.parentElement).closest('div').find('.changeBtn');
  $(messageCard).addClass('editable');
  $(messageCard).attr('contenteditable', 'true');
  $(editBtn).hide();
  $(saveBtn).show();
};

const handleSaveBtn = (e) => {
  const messageCard = $(e.target).closest('.messageCard').find('.message');
  const saveBtn = $(e.target.parentElement).closest('div').find('.saveBtn');
  const editBtn = $(e.target.parentElement).closest('div').find('.changeBtn');
  $(messageCard).removeClass('editable');
  $(messageCard).removeAttr('contenteditable');
  $(saveBtn).hide();
  $(editBtn).show();
};

export default { printToDom, handleEditBtn, handleSaveBtn };
