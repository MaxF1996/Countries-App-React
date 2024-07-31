import Header from "../components/Header/Header";
import classes from "./MainLayout.module.css";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className={classes.Main}>
        <div className={classes.Main__Container}>{children}</div>
      </main>
    </>
  );
}
