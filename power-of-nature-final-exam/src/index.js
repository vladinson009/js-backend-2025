import express from 'express';
import hbsConfig from './configs/hbsConfig.js';
import expressConfig from './configs/expressConfig.js';
import mongooseConfig from './configs/mongooseConfig.js';
import { PORT } from './constants.js';

const app = express();

// ? configs
expressConfig(app);
hbsConfig(app);
try {
  await mongooseConfig();
  console.log('DB Connected successfully!...');
} catch (error) {
  console.log('DB Can not connect!: ' + error.message);
}
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}...`)
);
