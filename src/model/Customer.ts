export class Customer {
    id: number | undefined;
    name: string;
    email: string;
    phone: string;
    locationjson: { x: number, y: number };
    created_at: string | undefined;
    updated_at: string | undefined;
    deleted_At: string | undefined;
}