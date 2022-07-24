import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL THE PLAYERS BY UID
const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET SINGLE PLAYER
const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// CREATE PLAYER
const createPlayer = (newPlayerObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, newPlayerObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}.json`, body).then(() => {
        getPlayers(newPlayerObj.uid).then(resolve);
      });
    })
    .catch(reject);
});

// UPDATE PLAYER
const updatePlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/players/${playerObj.firebaseKey}.json`, playerObj)
    .then(resolve)
    .catch(reject);
});

// DELETE PLAYER
const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/players/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  getPlayers,
  getSinglePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
