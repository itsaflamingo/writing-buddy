import { useRouter } from 'next/router';
import uniqid from 'uniqid';
import { useContext } from 'react';
import { getSelectedDivTitle, getSelectedDoc } from '@/functions/getSelectedDocument';
import { ChapterContext } from '@/contexts/Contexts';

export default function NavMenu({ context, showMenuItem }) {
  const router = useRouter();
  const { chapters } = useContext(ChapterContext);

  const goToEditChapter = (doc, endpoint) => {
    router.push({
      pathname: `/chapter/${endpoint}`,
      query: { data: JSON.stringify(doc) },
    });
  }

  const editClickHandler = (e) => {
    e.stopPropagation();

    const title = getSelectedDivTitle(e);
    const document = getSelectedDoc(title, chapters);

    goToEditChapter(document, 'create');

    return document;
  }

  return (
    <div className="flex flex-col gap-2 justify-center sticky">
      {context && context.map((data) => (
        <button type="button" onClick={(e) => showMenuItem(e)} key={uniqid()}>
          <div className="doc-title">{data.title}</div>
        </button>
      ))}
      <div className="flex flex-col gap-2 m-5">
        <button className="border-2 px-10" type="button" onClick={(e) => editClickHandler(e)}>Edit</button>
        <button className="border-2 px-10" type="button">Delete</button>
      </div>
    </div>
  )
}
