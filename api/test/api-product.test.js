const { expect } = require("chai");
const axios = require("axios");
const { getTokenHelper } = require("./api-cart.test");
const { getTokenForAdmin, getTokenForNonAdmin } = require("./utils")

describe("POST /Product", function () {
    it("Create new Product - Success ", async function () {
        const product = {
            productName: `product dummy ${new Date().getTime()}`,
            category: 1,
            price: 20
        }
        const result = await axios.post("http://localhost:4000/products/new", product, {
            headers: {
                authorization: getTokenForAdmin()
            }
        })
        const { data } = result;
        expect(result.status).equal(200)
        expect(data.message).equal("Product Added!")

        deleteFromDB(product.productName)
    })

    it("Create new Product - Failed - not admin ", async function () {
        const product = {
            productName: `product dummy ${new Date().getTime()}`,
            category: 1,
            price: 20
        }
        try {
            const result = await axios.post("http://localhost:4000/products/new", product, {
                headers: {
                    authorization: getTokenForNonAdmin()
                }
            })
            throw new Error("FAILED")
        } catch (ex) {
            expect(ex.response.status).equal(403)
        }

    })


    it("Create new Product - Failed ", async function () {
        try {
            const product = {
                id: 1243,
                title: "product dummy",
                category: "drinks111",
                images: ["a"],
                rating: 1.2
            }
            const result = await axios.post("http://localhost:4000/products/new", product, {
                headers: {
                    authorization: await getTokenHelper()
                }
            })
            throw new Error("FAILED")
        } catch (error) {
            expect(error.response.status).equal(400)
        }
    })
})

