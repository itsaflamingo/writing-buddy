import { useContext, useState } from "react";
import { UserContext } from "@/contexts/Contexts";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import SettingsNavBar from "@/components/SettingsNavBar";
import AccountPage from "@/components/AccountPage";

export default function Account() {
  const [switchPage, setSwitchPage] = useState(true);

  return (
    <div>
      <Header isHome={false} />
      <div className="border-2 border-black flex flex-col h-screen">
        <div className="flex justify-center">
          <h1>Account</h1>
        </div>
        <div className="border-2 border-black h-screen flex">
          <SettingsNavBar setPage={setSwitchPage} />
          {switchPage && <AccountPage />}
        </div>
      </div>
    </div>
  );
}
