import { useRouter } from "next/router";
import logo from "../images/logo/quill-pen.png";
import AuthButtons from "./AuthButtons";
import home from "../images/home-dark/icons8-home-96.png";

export default function Header({ isHome }) {
  const router = useRouter();

  const goHome = () => {
    router.push({
      pathname: "/dashboard",
    });
  };

  return (
    <header className="font-comfort relative shadow bg-[#FFFDFD] flex justify-between items-center h-[70px] px-[50px] py-[10px] z-10">
      <div className="bg-[#FFFDFD] border-[#1F2937] border-solid border rounded-full h-12 w-12 flex justify-center items-center">
        <img src={logo.src} alt="quill icon" className="h-[70%]" />
      </div>
      <div className="flex gap-4" style={{ zIndex: 1 }}>
        {!isHome && (
          <button type="button" onClick={() => goHome()}>
            <img src={home.src} alt="home button" className="max-h-8" />
          </button>
        )}
        <AuthButtons />
      </div>
    </header>
  );
}
