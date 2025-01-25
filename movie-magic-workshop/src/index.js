import express from 'express';
import 'dotenv/config.js';
import hbsConfig from './configs/hbsConfig.js';
import { PORT } from './constants.js';
const app = express();

hbsConfig(app);

app.listen(PORT, () => console.log(`Server is listneing on http://localhost:${PORT}...`));
