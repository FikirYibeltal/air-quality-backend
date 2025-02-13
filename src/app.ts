import express from 'express';
import sequelize from './utls/database';
import router from './routes';
const  cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});

app.use(router);

export default app;
