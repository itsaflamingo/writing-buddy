import { useContext, useState } from "react";
import { UserContext } from "@/contexts/Contexts";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import SettingsNavBar from "@/components/SettingsNavBar";
import AccountPage from "@/components/AccountPage";
import Settings from "./settings";

export default function Account() {
  const { userData } = useContext(UserContext);
  const { user } = userData;

  const [switchPage, setSwitchPage] = useState(true);
  console.log("INDEX USER", user);

  return (
    <div>
      <Header />
      <div className="border-2 border-black flex flex-col h-screen">
        <div className="flex justify-center">
          <h1>Account</h1>
        </div>
        <div className="border-2 border-black h-screen flex">
          <SettingsNavBar setPage={setSwitchPage} />
          {switchPage && <AccountPage />}
          {!switchPage && <Settings />}
        </div>
      </div>
    </div>
  );
}
