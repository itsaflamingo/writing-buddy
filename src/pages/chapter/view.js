import { useContext, useState } from 'react'
import { ChapterContext, CurrentActContext, CurrentChapterContext, CurrentProjectContext } from '@/contexts/Contexts'
import NavMenu from '@/components/NavMenu';
import { getSelectedDivTitle, getSelectedDoc } from '@/functions/getSelectedDocument';
import Header from '@/components/Header';

export default function ViewChapter() {
  const { currentChapter, setCurrentChapter } = useContext(CurrentChapterContext);
  const { currentProject } = useContext(CurrentProjectContext);
  const { chapters } = useContext(ChapterContext);

  const [section, setSection] = useState(chapters);

  const showMenuItem = (e) => {
    const title = e.target.innerText;
    const doc = getSelectedDoc(title, section);

    setCurrentChapter(doc);
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex justify-center gap-20">
        <div>
          <div>
            <h1>{currentProject.title}</h1>
            <p>{currentChapter.title}</p>
            <p>
              #
              {' '}
              {currentChapter.number}
            </p>
          </div>
          {currentChapter.body}
          <div>
            Last edit on
            {' '}
            {currentChapter.date_formatted}
          </div>
        </div>
        <NavMenu context={chapters} showMenuItem={showMenuItem} />
      </div>
    </div>
  )
}
