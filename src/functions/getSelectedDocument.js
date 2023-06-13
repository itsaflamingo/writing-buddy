const filterDocuments = (collection, title) => collection.filter((doc) => doc.title === title)

const getSelectedDivTitle = (e) => {
  const grandparentDiv = e.target.parentElement.parentElement;
  const title = grandparentDiv.querySelector('.doc-title');
  console.log(grandparentDiv);
  return title.innerText;
}

const getSelectedDoc = (title, collection) => {
  const chosenDoc = filterDocuments(collection, title);
  return chosenDoc[0];
}

export { getSelectedDivTitle, getSelectedDoc, filterDocuments }