import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Search({ players, setFilteredPlayers }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = players.filter((player) => player.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlayers(results);
  };

  const resetInput = () => {
    setSearchInput('');
    setFilteredPlayers(players);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search Player by Name"
          aria-label="Search Player by Name"
          value={searchInput}
          onChange={handleChange}
          aria-describedby="basic-addon2"
        />
        <Button variant="secondary" onClick={resetInput}>
          Reset Search
        </Button>
      </InputGroup>
      {/* <input placeholder="Search Player by Name" value={searchInput} onChange={handleChange} /> */}

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
