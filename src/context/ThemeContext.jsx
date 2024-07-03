import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const switchTheme = () => {
    setTheme((prevTheme) => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        return newTheme;
      });
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
      }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};