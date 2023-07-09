
import { pool } from "../../database/"


async function getAllCustomers(extended: boolean = true) {
    const fields = extended ? `*` : `CustomerID, CustomerName, City`;
    const query = `SELECT  ${fields}  from northwind.customers`
    const results = await pool.execute(query);
    const [data] = results;
    return data;
}

export { getAllCustomers }


