import axios from "axios"

export interface ICustomer {
    id: number,
    name: string,
    city: string,
    country: string,
    contact: string,
    address: string
}

async function getAllCustomers(): Promise<Array<ICustomer>> {
    const { data, headers } = await axios.get("http://localhost:4000/customers")
    if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)

    const customers: Array<ICustomer> = data.map(c => {
        return {
            id: c.CustomerID,
            name: c.CustomerName,
            contact: c.ContactName,
            city: c.City,
            country: c.Country,
            address: c.Address,
        }
    })
    return customers;
}

export { getAllCustomers }