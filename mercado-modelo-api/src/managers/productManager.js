import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.path)) return [];
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error leyendo productos:", error);
      return [];
    }
  }

  async saveProducts(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async getAll() {
    return await this.getProducts();
  }

  async getById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id == id);
  }

  async create(product) {
    const products = await this.getProducts();

    const newId =
      products.length === 0 ? 1 : products[products.length - 1].id + 1;

    const newProduct = {
      id: newId,
      ...product,
    };

    products.push(newProduct);
    await this.saveProducts(products);
    return newProduct;
  }

  async update(id, data) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id == id);

    if (index === -1) return null;

    delete data.id; 

    products[index] = { ...products[index], ...data };
    await this.saveProducts(products);

    return products[index];
  }

  async delete(id) {
    const products = await this.getProducts();
    const filtered = products.filter((p) => p.id != id);
    await this.saveProducts(filtered);
  }
}
