import express from 'express';
import { getHello } from './controllers/appController.js';
import { signup, login } from './controllers/authController.js';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', getHello);
app.post('/signup', signup);
app.post('/login', login);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
