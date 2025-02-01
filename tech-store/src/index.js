import express from 'express';
import 'dotenv/config.js';

import mongooseConfig from './configs/mongooseConfig.js';
import hbsConfig from './configs/hbsConfig.js';
import expressConfig from './configs/expressConfig.js';
import { PORT } from './constants.js';

const app = express();
try {
  await mongooseConfig();
  console.log('DB connected Successfully...');
} catch (error) {
  console.log('DB can not connect... :' + error.message);
}
hbsConfig(app);
expressConfig(app);

app.listen(PORT, () => console.log(`Server is listening on http://localhost:3000...`));
