import { useTheme } from "../../context/ThemeContext";
import classes from "./ThemeSwitcher.module.css";
import { FaMoon } from "react-icons/fa6";



export default function ThemeSwitcher() {
 
        const {switchTheme} = useTheme();

  return (
    <button
      type="button"
      className={classes.ThemeSwitcher}
      onClick={switchTheme}
    >
      <FaMoon className={classes.ThemeSwitcher__Icon} />
      Switch Mode
    </button>
  );
}
