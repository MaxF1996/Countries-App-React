import classes from "./Header.module.css"
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

export default function Header() {
  return (
    <header className={classes.Header}>
      <div className={classes.Header__Container}>
        <a href="./index.html" className={classes.Header__Logo}>
          Where in the world ?
        </a>
        <ThemeSwitcher/>
      </div>
    </header>
  );
}
