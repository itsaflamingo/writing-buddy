export default function returnSingularCollection(collection) {
  let singularWord;
  switch (collection) {
    case 'projects':
      singularWord = 'Project'
      break;
    case 'acts':
      singularWord = 'Act'
      break;
    case 'chapters':
      singularWord = 'Chapter'
      break;
    default: singularWord = 'Project'
  }
  return singularWord;
}
