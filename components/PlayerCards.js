import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlayer } from '../api/playerData';

function PlayerCards({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Warning: ${playerObj.name} will be permanently deleted. Are you sure you want to continue?`)) {
      deletePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={playerObj.imageUrl} alt={playerObj.name} />
        <Card.Body>
          <Card.Title>{playerObj.name}</Card.Title>
          <Card.Text>{playerObj.position}</Card.Text>
          <Card.Text>#{playerObj.jerseyNumber}</Card.Text>
          <Link href={`/${playerObj.firebaseKey}`} passHref>
            <Button variant="info">Edit</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPlayer}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

PlayerCards.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    jerseyNumber: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCards;
