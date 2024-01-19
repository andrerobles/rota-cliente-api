import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import customersController from './src/controller/CustomerController';
import router from './src/route';

const app = express();
const port = 3300;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});