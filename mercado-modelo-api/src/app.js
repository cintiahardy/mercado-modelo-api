import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
  console.log("🍏 MERCADO MODELO API – Servidor activo en puerto 8080");
  console.log("🌱 'Lo natural hace bien' – API lista para usar con Postman");
});
