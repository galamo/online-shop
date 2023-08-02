
import express from "express"
import products from "./data"
import zod from "zod"
import { getAllProducts } from "./handlers/getProducts";
// import { tokens } from "../auth/route";
const productsRouter = express.Router();
// tokens
const productBody = zod.object({
    id: zod.number(),
    title: zod.string().max(20).optional(),
    images: zod.array(zod.string()),
    rating: zod.number().max(5),
    category: zod.enum(["dairy", "drinks", "food", "fruits",])
})

productsRouter.get("/", async function (req, res, next) {
    try {
        const result = await getAllProducts()
        return res.json(result)
    } catch (error) {
        return next(error)
    }
})


productsRouter.get("/:id", function (req, res, next) {
    return res.json(products) // filter by id
})


productsRouter.post("/new", function (req, res, next) {

    try {
        productBody.parse(req.body)

        const { id,
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images } = req.body;
        products.push({
            id,
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images
        })
        return res.json({ message: "Product Added!" })
    } catch (error) {
        const { errors } = error
        console.log(errors[0].path[0] + "=> " + errors[0].message)
        res.status(400).json({ error: errors[0].path[0] + "=> " + errors[0].message })
    }



})



productsRouter.put("/:pid", function (req, res, next) {
    try {
        productBody.parse(req.body)
        const currentIndex = products.findIndex(cid => cid.id === +req.params.pid)
        if (currentIndex === -1) return res.status(404).send("not found")
        products[currentIndex] = { ...products[currentIndex], ...req.body }
        return res.json({ messagE: "product changed", newP: products[currentIndex] })
    } catch (error) {
        const { errors } = error
        console.log(errors[0].path[0] + "=> " + errors[0].message)
        res.status(400).json({ error: errors[0].path[0] + "=> " + errors[0].message })
    }

})

export { productsRouter };