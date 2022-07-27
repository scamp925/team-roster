/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getPlayers } from '../api/playerData';
import PlayerCards from '../components/PlayerCards';
import Search from '../components/Search';
import { useAuth } from '../utils/context/authContext';

export default function TeamRoster() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();

  const getTeamRoster = () => {
    getPlayers(user.uid).then((playersArray) => {
      setPlayers(playersArray);
      setFilteredPlayers(playersArray);
    });
  };

  useEffect(() => {
    getTeamRoster();
  }, []);

  return (
    <div>
      <header>
        <h1>Team</h1>
        <Search players={players} setFilteredPlayers={setFilteredPlayers} />
      </header>
      <div className="cards-container">
        {filteredPlayers.map((player) => (
          <PlayerCards key={player.firebaseKey} playerObj={player} onUpdate={getTeamRoster} />
        ))}
      </div>
    </div>
  );
}
