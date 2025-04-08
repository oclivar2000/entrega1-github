const express = require("express");
const ProductManager = require("../productManager");
const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.get("/:pid", async (req, res) => {
    const product = await productManager.getProductById(Number(req.params.pid));
    product ? res.json(product) : res.status(404).send("Producto no encontrado");
});

router.post("/", async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

router.put("/:pid", async (req, res) => {
    const updatedProduct = await productManager.updateProduct(Number(req.params.pid), req.body);
    updatedProduct ? res.json(updatedProduct) : res.status(404).send("Producto no encontrado");
});

router.delete("/:pid", async (req, res) => {
    const success = await productManager.deleteProduct(Number(req.params.pid));
    success ? res.send("Producto eliminado") : res.status(404).send("Producto no encontrado");
});

module.exports = router;
