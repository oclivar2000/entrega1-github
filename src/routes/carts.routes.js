const express = require("express");
const CartManager = require("../cartManager");
const router = express.Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCartById(Number(req.params.cid));
    cart ? res.json(cart) : res.status(404).send("Carrito no encontrado");
});

router.post("/:cid/product/:pid", async (req, res) => {
    const updatedCart = await cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
    updatedCart ? res.json(updatedCart) : res.status(404).send("Carrito no encontrado");
});

module.exports = router;
