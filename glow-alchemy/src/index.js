import express from 'express';
import { PORT } from './constants.js';
import hbsConfig from './configs/hbsConfig.js';
import expressConfig from './configs/expressConfig.js';

const app = express();

// ? configs
expressConfig(app);
hbsConfig(app);

app.get('/', (req, res) => res.render('home'));
app.listen(PORT, () =>
  console.log('Server is listening on http://localhost:3000...')
);
