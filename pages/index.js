/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getPlayers } from '../api/playerData';
import PlayerCards from '../components/PlayerCards';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();

  const getTeamRoster = () => {
    getPlayers(user.uid).then((playersArray) => {
      setPlayers(playersArray);
    });
  };

  useEffect(() => {
    getTeamRoster();
  }, []);

  return (
    <div>
      <header>
        <h1>Benvenuto! </h1>
      </header>
      <div className="cards-container">
        {players.map((player) => (
          <PlayerCards key={player.firebaseKey} playerObj={player} onUpdate={getTeamRoster} />
        ))}
      </div>
    </div>
  );
}

export default Home;
