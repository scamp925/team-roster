import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Search({ players, setFilteredPlayers }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = players.filter((player) => player.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlayers(results);
  };

  return (
    <div>
      <input placeholder="Search Players by Name" value={searchInput} onChange={handleChange} />
    </div>
  );
}

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  setFilteredPlayers: PropTypes.func.isRequired,
};

export default Search;
