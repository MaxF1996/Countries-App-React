import Home from "./pages/Home/Home";
import CountryPage from "./pages/CountryPage/CountryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { useEffect } from "react";

export default function App() {
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <BrowserRouter basename="/countries-app-react/">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/country/:cca3" element={<CountryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
