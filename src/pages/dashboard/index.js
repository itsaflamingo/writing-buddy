import Header from "@/components/Header";
import UserHub from "@/components/UserHub";

export default function RenderDashboard() {
  return (
    <div>
      <Header isHome={false} />
      <UserHub />
    </div>
  );
}
