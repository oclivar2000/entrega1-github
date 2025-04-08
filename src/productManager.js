const fs = require("fs");
const path = "./src/products.json";

class ProductManager {
    constructor() {
        this.path = path;
    }

    async getProducts() {
        try {
            if (!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer productos:", error);
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(prod => prod.id === id) || null;
    }

    async addProduct({ title, description, code, price, status = true, stock, category, thumbnails = [] }) {
        const products = await this.getProducts();
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            title, description, code, price, status, stock, category, thumbnails
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        let products = await this.getProducts();
        const index = products.findIndex(prod => prod.id === id);
        if (index === -1) return null;

        products[index] = { ...products[index], ...updatedFields };
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        const filteredProducts = products.filter(prod => prod.id !== id);
        if (filteredProducts.length === products.length) return false;

        await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
        return true;
    }
}

module.exports = ProductManager;
