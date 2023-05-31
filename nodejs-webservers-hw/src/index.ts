import express from 'express';
import { createUser, getUserById, getUsers, updateUser, deleteUser } from './controllers/userController';

const app = express();
app.use(express.json());

app.post('/users', createUser);
app.get('/users/:id', getUserById);
app.get('/users', getUsers);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.get('/', (_req, res) => {
  return res.send('Some cool text!!!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});