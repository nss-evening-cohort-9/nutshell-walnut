const printToDom = (divId, textToPrint) => {
  const selectDiv = document.getElementById(divId);
  selectDiv.innerHTML = textToPrint;
};

export default { printToDom };
