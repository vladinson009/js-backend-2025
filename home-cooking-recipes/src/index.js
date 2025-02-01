import express from 'express';
import expressConfig from './configs/expressConfig.js';
import hbsConfig from './configs/hbsConfig.js';
import mongooseConfig from './configs/mongooseConfig.js';

const PORT = 3000;
const app = express();

expressConfig(app);
hbsConfig(app);
try {
  await mongooseConfig();
  console.log('Connected to DB successfully');
} catch (error) {
  console.log('Connected to DB failed... ' + error.message);
}

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT} ...`));
