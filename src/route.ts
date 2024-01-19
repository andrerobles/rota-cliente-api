import express from 'express';
import customersController from './controller/CustomerController';

const router = express.Router();

//Lista clientes
router.get('/customers', async (req, res) => {
    return customersController.getAllCustomers(req, res);
  });
  
  //Busca Cliente
  router.get('/customers/:id', async (req, res) => {
    return customersController.getCustomerById(req, res);
  });
  
  //Cria Cliente
  router.post('/customers', async (req, res) => {
    return customersController.createCustomer(req, res);
  });
  
  //Atualiza Cliente
  router.put('/customers/:id', async (req, res) => {
    return customersController.updateCustomer(req, res);
  });
  
  //Deleta Cliente
  router.delete('/customers/:id', async (req, res) => {
    return customersController.deleteCustomerById(req, res);
  });
  
  //Obtem rota de entrega otimizada
  router.get('/sortCustomers', async (req, res) => {
    return customersController.sortCustomersByDistance(req, res);
  });

export default router;