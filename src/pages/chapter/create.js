import CreateChapter from "@/components/CreateChapter";
import Header from "@/components/Header";

export default function Create() {
  return (
    <div>
      <Header isHome={false} />
      <CreateChapter />
    </div>
  );
}
