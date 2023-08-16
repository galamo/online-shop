
import { pool } from "../../database"


async function addProductToCart(productId: number, cartId: number, price: number, quantity: number) {
    const totalPrice = calculateTotalPrice(price, quantity)
    console.log(totalPrice)
    const query = `INSERT INTO northwind.carts_products (productId, cartId, price, quantity) VALUES (?, ?, ?, ?);`
    const results = await pool.execute(query, [productId, cartId, price, quantity]);
    console.log(results)
    const [data] = results;
    return (data as any).insertId;
}

function calculateTotalPrice(price: number, quantity: number): number {
    if (typeof price !== 'number') return 0
    if (typeof quantity !== 'number') return 0
    return price * quantity
}

export { addProductToCart, calculateTotalPrice }


