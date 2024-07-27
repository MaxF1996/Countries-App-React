import { useState } from "react";
import classes from "./SearchInput.module.css";
import { FaSearch } from "react-icons/fa";

export default function SearchInput({ onSubmit }) {
  const [searchInput, setSearchInput] = useState("");
  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(searchInput);
  }
  return (
    <form className={classes.SearchInputContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        className={classes.SearchInput}
        placeholder="Search for a country..."
        onChange={handleInputChange}
        value={searchInput}
      />
      <FaSearch className={classes.SearchInput__Icon} />
    </form>
  );
}
