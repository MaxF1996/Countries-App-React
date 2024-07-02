import classes from "./Header.module.css";
import { FaMoon } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="header">
      <div className="header__conatiner">
        <a href="#" className="header__logo">
          Where in the world?
        </a>
        <button type="button" className="header__theme-switcher">
          <FaMoon /> Dark Mode
        </button>
      </div>
    </header>
  );
}
