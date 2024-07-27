import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "./context/ThemeContext";
import Header from "./components/Header/Header";
import SearchInput from "./components/SearchInput/SearchInput";
import CardsGrid from "./components/CardsGrid/CardsGrid";

import "./App.css";

export default function App() {
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("countries")) || []
  );

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      const storedDate = JSON.parse(localStorage.getItem("date"));

      if (!storedDate || !isWithin3Days(new Date(storedDate))) {
        try {
          const response = await axios.get(
            "https://restcountries.com/v3.1/all"
          );
          const sortedData = response.data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
          );
          storeDataAndDate(sortedData);
          setData(sortedData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, []);

  const isWithin3Days = (date) => {
    const today = new Date();
    const diffTime = Math.abs(today - date);
    return diffTime <= 3 * 24 * 60 * 60 * 1000;
  };

  const storeDataAndDate = (countries) => {
    localStorage.setItem("countries", JSON.stringify(countries));
    localStorage.setItem("date", JSON.stringify(new Date()));
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase().trim());
  };

  useEffect(() => {
    const filteredData = data.filter(
      (country) => new RegExp(searchQuery, "i").test(country.name.common)
      // country.name.common.toLowerCase().includes(searchQuery)
    );
    setFilteredData(filteredData);
  }, [searchQuery, data]);
  return (
    <div className="App">
      <Header />
      <main className="Main">
        <div className="Main__Container">
          <SearchInput onSubmit={handleSearch} />
          {searchQuery ? (
            <CardsGrid data={filteredData} renderReason="search" />
          ) : (
            <CardsGrid data={data} renderReason="pageloading" />
          )}
        </div>
      </main>
    </div>
  );
}
