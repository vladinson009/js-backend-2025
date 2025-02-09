import express from 'express';
import { PORT } from './constants.js';

const app = express();

app.listen(PORT, () =>
  console.log('Server is listening on http://localhost:3000...')
);
