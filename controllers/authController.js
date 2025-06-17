import { createUser, findUserByEmail } from '../models/userModel.js';

const signup = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res.status(400).send('Email already exists');
  }

  const newUser = createUser(email, password);
  res.status(201).json(newUser);
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(400).send('Invalid credentials');
  }

  if (user.password !== password) {
    return res.status(400).send('Invalid credentials');
  }

  res.status(200).json({ message: 'Login successful' });
};

export { signup, login };
