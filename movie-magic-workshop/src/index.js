import express from 'express';
import hbsConfig from './configs/hbsConfig.js';

const app = express();

hbsConfig(app);
