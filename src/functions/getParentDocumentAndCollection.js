const getParentDocumentAndCollection = (collect, project, act, chapters) => {
  let parentCollection = null;
  let parentDocument = null;

  switch (collect) {
    case 'acts':
      parentCollection = 'projects';
      parentDocument = project[0];
      break;
    case 'chapters':
      if (chapters.length === 1) {
        parentCollection = 'acts';
        parentDocument = act[0];
      } else {
        parentCollection = 'chapters';
        parentDocument = act[0];
      }
      break;
    default: parentCollection = null;
  }

  return { parentCollection, parentDocument };
}

export default getParentDocumentAndCollection
