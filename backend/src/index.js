import dotenv from 'dotenv';
import db from './db.js';
import logger from './logger.js';
import app from './app.js';

dotenv.config();
db();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});