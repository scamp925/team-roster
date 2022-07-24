import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createPlayer, updatePlayer } from '../api/playerData';

const initialState = {
  imageUrl: '',
  name: '',
  position: '',
  jerseyNumber: '',
};
function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
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
    if (obj.firebaseKey) {
      updatePlayer(formInput)
        .then(() => router.push(`/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/team');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-black mt-5">{obj?.firebaseKey ? 'Update' : 'Add'} a Player</h1>
      <FloatingLabel controlId="floatingInput1" label="Full Name" className="mb-3">
        <Form.Control type="text" placeholder="Ex: Frederico Chiesa" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Position" className="mb-3">
        <Form.Control type="text" placeholder="Ex: Midfielder" name="position" value={formInput.position} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Jersey Number" className="mb-3">
        <Form.Control type="text" placeholder="Ex: 14" name="jerseyNumber" value={formInput.jerseyNumber} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Image URL" className="mb-3">
        <Form.Control type="url" placeholder="Enter image url" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj?.firebaseKey ? 'Update' : 'Add'} Player</Button>
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
