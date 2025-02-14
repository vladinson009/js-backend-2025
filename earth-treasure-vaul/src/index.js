import express from 'express';
import { PORT } from './constants.js';
import hbsConfig from './configs/ hbsConfig.js';
import expressConfig from './configs/expressConfig.js';
import mongooseConfig from './configs/mongooseConfig.js';

const app = express();

expressConfig(app);
hbsConfig(app);

try {
  await mongooseConfig();
  console.log('DB connected Successfully');
} catch (error) {
  console.log('DB Failed to connect');
}

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}...`)
);
