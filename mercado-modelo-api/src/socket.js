import { Server } from "socket.io";
import ProductManager from "./managers/ProductManager.js";

const productManager = new ProductManager("./data/products.json");

export default function configureSocket(server) {
  const io = new Server(server);

  io.on("connection", async socket => {
    const products = await productManager.getProducts();
    socket.emit("products", products);

    socket.on("newProduct", async product => {
      await productManager.addProduct(product);
      const updated = await productManager.getProducts();
      io.emit("products", updated);
    });
  });
}
