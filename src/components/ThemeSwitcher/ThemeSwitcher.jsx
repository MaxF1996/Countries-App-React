import { useTheme } from "../../context/ThemeContext";
import classes from "./ThemeSwitcher.module.css";
import { FaMoon, FaSun } from "react-icons/fa6";



export default function ThemeSwitcher() {
 
        const {theme, switchTheme} = useTheme();

  return (
    <button
      type="button"
      className={classes.ThemeSwitcher}
      onClick={switchTheme}
    >
      {theme === "light" ? <FaMoon className={classes.ThemeSwitcher__Icon} /> : <FaSun className={classes.ThemeSwitcher__Icon} />}
      Switch Mode
    </button>
  );
}
