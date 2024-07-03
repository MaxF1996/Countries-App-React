import "normalize.css";
import "./App.css";

import { useEffect } from "react";
import { ThemeProvider, useTheme} from "./context/ThemeContext";
import Header from "./components/Header/Header";

function AppContent() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </>
  );
}
