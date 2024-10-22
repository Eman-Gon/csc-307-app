// user.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { findAllUsers, createUser, findUserByIdAndDelete } from './services/user-service.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await findUserByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
