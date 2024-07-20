import { useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import Header from './components/Header/Header';
import CardsGrid from './components/CardsGrid/CardsGrid';

import './App.css';

export default function App() {
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div className="App">
      <Header />
      <main className="Main">
        <div className="Main__Container">
          <CardsGrid />
        </div>
      </main>
    </div>
  );
}
