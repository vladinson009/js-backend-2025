import express from 'express';
import 'dotenv/config.js';
import hbsConfig from './configs/hbsConfig.js';
import { PORT } from './constants.js';
import mongooseConfig from './configs/mongooseConfig.js';
import expressConfig from './configs/expressConfig.js';
const app = express();

expressConfig(app);
hbsConfig(app);
mongooseConfig();

app.listen(PORT, () => console.log(`Server is listneing on http://localhost:${PORT}...`));
