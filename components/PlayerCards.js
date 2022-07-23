import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function PlayerCards({ playerObj }) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={playerObj.imageUrl} alt={playerObj.name} />
        <Card.Body>
          <Card.Title>{playerObj.name}</Card.Title>
          <Card.Text>{playerObj.position}</Card.Text>
          <Card.Text>#{playerObj.jerseyNumber}</Card.Text>
          <Link href={`/edit/${playerObj.firebaseKey}`} passHref>
            <Button variant="info">Edit</Button>
          </Link>
          <Button variant="danger">Delete</Button>
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
};

export default PlayerCards;
