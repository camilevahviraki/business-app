import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ImSearch } from 'react-icons/im';
import { BsFilterLeft } from 'react-icons/bs';
import './SearchBar.css';

const SearchBar = (props) => {
  const {
    onSearch,
    instantSearch,
  } = props;

  const [value, setValue] = useState('');

  const changeSearchValue = (e) => {
    setValue(e.target.value);

    if (instantSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSearch = () => {
    onSearch(value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div className="search-wrapper">
        <input
          type="search"
          placeholder="Search..."
          name="search-bar"
          value={value}
          onChange={changeSearchValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <ImSearch color="black" className="searchIcon" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default SearchBar;
