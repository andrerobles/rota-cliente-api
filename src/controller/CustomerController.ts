import { Request, Response } from "express";
import { Customer } from "../model/Customer";
import customerRepository from "../repository/CustomerRepository";

export default class customersController {
    public static getAllCustomers = async (req: Request, res: Response) => {
        try {
            const customers = await customerRepository.getAllCustomers();
            return res.json(customers);
        } catch (error) {
            return res.status(401).json({ message: `Erro ao listar clientes: ${JSON.stringify(error)}` });
        }
    }

    public static createCustomer = async (req: Request, res: Response) => {
        const { name, email, phone, locationjson }: Customer = req.body;
        if (!name || !email || !phone || !locationjson) {
            return res.status(400).json({ error: 'Nome, email, telefone e localização são obrigatórios' });
        }
        try {
            const customer = {
                name: name,
                email: email,
                phone: phone,
                locationjson: locationjson
            } as Customer;
            const customerCreated = await customerRepository.createCustomer(customer);
            if (customerCreated) {
                return res.status(201).json(customerCreated);
            }
        } catch (error) {
            return res.status(401).json({ message: `Erro ao criar clientes: ${JSON.stringify(error)}` });
        }
    }

    public static getCustomerById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const customer = await customerRepository.getCustomerById(Number(id));
            res.json(customer);
        } catch (error) {
            return res.status(401).json({ message: `Erro ao buscar cliente: ${JSON.stringify(error)}` });
        }
    }

    public static updateCustomer = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, email, phone, locationjson }: Customer = req.body;
        if (!name || !email || !phone || !locationjson) {
            return res.status(400).json({ error: 'Nome, email, telefone e localização são obrigatórios' });
        }
        try {
            const customer = {
                id: Number(id),
                name: name,
                email: email,
                phone: phone,
                locationjson: locationjson
            } as Customer;

            const customerUpdated = await customerRepository.updateCustomer(customer);
            if (customerUpdated) {
                return res.status(201).json(customerUpdated);
            }
        } catch (error) {
            return res.status(401).json({ message: `Erro ao buscar cliente: ${JSON.stringify(error)}` });
        }
    }

    public static deleteCustomerById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const customer = await customerRepository.deleteCustomerById(Number(id));
            res.json(customer);
        } catch (error) {
            return res.status(401).json({ message: `Erro ao buscar cliente: ${JSON.stringify(error)}` });
        }
    }

    public static sortCustomersByDistance = async (req: Request, res: Response) => {
        try {
            const customers = await customerRepository.sortCustomersByDistance();
            return res.json(customers);
        } catch (error) {
            return res.status(401).json({ message: `Erro ao listar clientes: ${JSON.stringify(error)}` });
        }
    }
}