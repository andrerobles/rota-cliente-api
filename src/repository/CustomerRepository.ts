import { dataPool } from "../database/DataSource";
import { QueryResult } from 'pg';
import { Customer } from "../model/Customer";
import moment from "moment";

export default class customersRepository {
    public static getAllCustomers = async () => {
        const result = await dataPool.query('SELECT * FROM customers WHERE deleted_at IS NULL') as QueryResult<any>;
        if (result?.rows) {
            const customers: Customer[] = result.rows;
            return customers;
        }

        return [];
    }
    public static createCustomer = async (customer: Customer) => {
        let customerToCreate = new Customer();
        customerToCreate.name = customer.name;
        customerToCreate.email = customer.email;
        customerToCreate.phone = customer.phone;
        customerToCreate.locationjson = customer.locationjson;

        const result = await dataPool.query('INSERT INTO customers (name, email, phone, locationjson) VALUES ($1, $2, $3, $4) RETURNING *',
            [
                customer.name,
                customer.email,
                customer.phone,
                customer.locationjson
            ]) as QueryResult<any>;

        if (result?.rows) {
            const customerCreated: Customer = result.rows[0];
            return customerCreated;
        }

        return null;
    }

    public static updateCustomer = async (customer: Customer) => {
        const result = await dataPool.query(
            'UPDATE customers SET name = $1, email = $2, phone = $3, locationjson = $4, updated_at = $5 WHERE id = $6 RETURNING *',
            [
                customer.name,
                customer.email,
                customer.phone,
                customer.locationjson,
                moment().format("YYYY-MM-DD HH:mm:ss"),
                customer.id
            ]) as QueryResult<any>;

        if (result?.rows) {
            const customerUpdated: Customer = result.rows[0];
            return customerUpdated;
        }
    }

    public static getCustomerById = async (id: number): Promise<Customer | undefined> => {
        const result = await dataPool.query('SELECT * FROM customers WHERE deleted_at IS NULL AND id = $1', [id]);

        if (result?.rows) {
            const customer: Customer = result.rows[0];
            return customer;
        }

        return null;
    }
    
    public static deleteCustomerById = async (id: number): Promise<Customer | undefined> => {
        const result = await dataPool.query(
            'UPDATE customers SET deleted_at = $1 WHERE id = $2 RETURNING *', [moment().format("YYYY-MM-DD HH:mm:ss"),id]) as QueryResult<any>;

        if (result?.rows) {
            const customer: Customer = result.rows[0];
            return customer;
        }

        return null;
    }


    public static sortCustomersByDistance = async (): Promise<Customer[]> => {
        const customers: Customer[] = await this.getAllCustomers();

        const pontoInicial = { x: 0, y: 0 };

        customers.sort((a, b) => {
            // Calcula a distância euclidiana entre cada cliente e o ponto inicial
            const distanciaA = this.calculateDistance(pontoInicial.x, pontoInicial.y, a.locationjson.x, a.locationjson.y);
            const distanciaB = this.calculateDistance(pontoInicial.x, pontoInicial.y, b.locationjson.x, b.locationjson.y);

            // Compara as distâncias para ordenar as clientes
            return distanciaA - distanciaB;
        });

        return customers;
    }

    // Fórmula de distância euclidiana em coordenadas cartesianas
    private static calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

}