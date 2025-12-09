import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const manager = new CartManager("./data/carts.json");

router.post("/", async (req, res) => {
  const cart = await manager.createCart();
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const cart = await manager.getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

  res.json(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await manager.addProduct(req.params.cid, req.params.pid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

  res.json(cart);
});

export default router;
