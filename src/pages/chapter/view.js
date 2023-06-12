import { useContext } from 'react'
import { ChapterContext, CurrentActContext, CurrentChapterContext, CurrentProjectContext } from '@/contexts/Contexts'
import NavMenu from '@/components/NavMenu';

export default function ViewChapter() {
  const { currentChapter } = useContext(CurrentChapterContext);
  const { currentProject } = useContext(CurrentProjectContext);
  const { chapters } = useContext(ChapterContext);

  return (
    <div className='flex justify-center gap-20'>
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
      <NavMenu context={chapters} />
    </div>
  )
}
