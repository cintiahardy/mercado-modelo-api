import { Server } from "socket.io";
import ProductManager from "./managers/ProductManager.js";

const productManager = new ProductManager("./src/data/products.json");

export default function configureSocket(server) {
  const io = new Server(server);

  io.on("connection", async (socket) => {
    console.log("🟢 Cliente conectado");

    const products = await productManager.getAll();
    socket.emit("products", products);

    socket.on("newProduct", async (data) => {
      await productManager.create({
        title: data.title,
        price: Number(data.price)
      });

      const updatedProducts = await productManager.getAll();
      io.emit("products", updatedProducts);
    });
  });
}
