import { useRouter } from "next/router";
import owl from "../images/owl-white.png";
import AuthButtons from "./AuthButtons";
import home from "../images/home-dark/icons8-home-96.png";

export default function Header({ isHome }) {
  const router = useRouter();

  const goHome = () => {
    router.push({
      pathname: "/dashboard",
    });
  };

  // const visitFeed = () => {
  //   router.push({
  //     pathname: "/feed",
  //   });
  // };

  return (
    <header className="flex justify-between items-center h-[70px] px-[50px] py-[10px] shadow-sm text-gray-800">
      <div className="bg-cyan-700 rounded-full h-12 w-12 flex justify-center items-center">
        <img src={owl.src} alt="owl icon" className="h-[70%]" />
      </div>
      <div className="flex gap-4" style={{ zIndex: 1 }}>
        {isHome === false && (
          <button type="button" onClick={() => goHome()}>
            <img src={home.src} alt="home button" className="max-h-8" />
          </button>
        )}
        <AuthButtons />
      </div>
    </header>
  );
}
