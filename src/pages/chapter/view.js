import { useContext, useState } from "react";
import {
  ChapterContext,
  CurrentChapterContext,
  CurrentProjectContext,
} from "@/contexts/Contexts";
import NavMenu from "@/components/NavMenu";
import { getSelectedDoc } from "@/functions/getSelectedDocument";
import Header from "@/components/Header";

export default function ViewChapter() {
  const { currentChapter, setCurrentChapter } = useContext(
    CurrentChapterContext
  );
  const { currentProject } = useContext(CurrentProjectContext);
  const { chapters } = useContext(ChapterContext);

  const [section, setSection] = useState(chapters);

  const showMenuItem = (e) => {
    const title = e.target.innerText;
    const doc = getSelectedDoc(title, section);

    setCurrentChapter(doc);
  };

  return (
    <div className="flex flex-col">
      <Header isHome={false} />
      <div className="flex justify-center gap-20 m-5">
        <div className="flex flex-col w-10/12 items-center">
          <div>
            <h1 className="text-xl">{currentProject.title}</h1>
            <p className="text-5xl font-bold">{currentChapter.title}</p>
            <p className="text-2xl flex justify-center">
              # {currentChapter.number}
            </p>
          </div>
          <div
            className="border-2 min-w-full p-5 m-5"
            dangerouslySetInnerHTML={{
              __html: `<p>${currentChapter.body}</p>`,
            }}
          />
          <div className="text-sm">
            Last edit on {currentChapter.date_formatted}
          </div>
        </div>
        <NavMenu context={chapters} showMenuItem={showMenuItem} />
      </div>
    </div>
  );
}
