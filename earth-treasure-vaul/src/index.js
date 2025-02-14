import express from 'express';
import { PORT } from './constans.js';

const app = express();

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}...`)
);
