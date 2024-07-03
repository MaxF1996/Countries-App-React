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
    <main className="App">
      <Header />
    </main>
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
