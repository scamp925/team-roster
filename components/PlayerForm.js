import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createPlayer, getPlayers } from '../api/playerData';

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPlayers(user.uid);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };
    createPlayer(payload).then(() => {
      router.push('/team');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} a Player</h1>
      <FloatingLabel controlId="floatingInput1" label="Full Name" className="mb-3">
        <Form.Control type="text" placeholder="Ex: Frederico Chiesa" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter image url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Position" className="mb-3">
        <Form.Control type="text" placeholder="Ex: Midfielder" name="position" value={formInput.position} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Jersey Number" className="mb-3">
        <Form.Control type="text" placeholder="Ex: 14" name="position" value={formInput.jerseyNumber} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Book</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    jerseyNumber: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default PlayerForm;
