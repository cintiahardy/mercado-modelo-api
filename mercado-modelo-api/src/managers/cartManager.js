import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (!fs.existsSync(this.path)) return [];
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error leyendo carritos:", error);
      return [];
    }
  }

  async saveCarts(carts) {
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  // CREATE CART
  async createCart() {
    const carts = await this.getCarts();

    const newId =
      carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;

    const newCart = {
      id: newId,
      products: []
    };

    carts.push(newCart);
    await this.saveCarts(carts);

    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id == id);
  }

  async addProduct(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id == cid);

    if (!cart) return null;

    const existing = cart.products.find(p => p.product == pid);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.saveCarts(carts);
    return cart;
  }
}
