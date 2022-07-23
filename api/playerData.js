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

// CREATE PLAYER
const createPlayer = (newPlayerObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, newPlayerObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}`, body).then(() => {
        getPlayers(newPlayerObj.uid).then(resolve);
      });
    })
    .catch(reject);
});

export {
  getPlayers,
  createPlayer,
};
