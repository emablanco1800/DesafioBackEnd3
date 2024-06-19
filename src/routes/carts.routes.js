import { Router } from "express";
import cartDao from "../dao/mongoDB/cart.dao.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router();

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    // Crea un nuevo carrito utilizando el DAO de carrito
    const cart = await cartDao.create();
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Ruta para obtener un carrito por su ID
router.get("/:cid", async (req, res) => {
  try {
    // Obtiene el ID del carrito de los parámetros de la ruta
    const { cid } = req.params;
    // Obtiene el carrito utilizando el DAO de carrito
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Ruta para agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    // Obtiene los IDs del carrito y del producto de los parámetros de la ruta
    const { cid, pid } = req.params;
    // Obtiene el producto utilizando el DAO de producto
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    // Obtiene el carrito utilizando el DAO de carrito
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    // Agrega el producto al carrito utilizando el DAO de carrito
    const cartUpdate = await cartDao.addProductToCart(cid, pid);
    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Ruta para eliminar un producto de un carrito
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    // Obtiene los IDs del carrito y del producto de los parámetros de la ruta
    const { cid, pid } = req.params;
    // Obtiene el producto utilizando el DAO de producto
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    // Obtiene el carrito utilizando el DAO de carrito
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    // Elimina el producto del carrito utilizando el DAO de carrito
    const cartUpdate = await cartDao.deleteProductToCart(cid, pid);
    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Ruta para actualizar la cantidad de un producto en un carrito
router.put("/:cid/product/:pid", async (req, res) => {
  try {
    // Obtiene los IDs del carrito y del producto de los parámetros de la ruta
    const { cid, pid } = req.params;
    // Obtiene la nueva cantidad del producto del cuerpo de la solicitud
    const { quantity } = req.body
    // Obtiene el producto utilizando el DAO de producto
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    // Obtiene el carrito utilizando el DAO de carrito
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    // Actualiza la cantidad del producto en el carrito utilizando el DAO de carrito
    const cartUpdate = await cartDao.updateQuantityProductInCart(cid, pid, Number(quantity));
    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Ruta para eliminar todos los productos de un carrito
router.delete("/:cid", async (req, res) => {
  try {
    // Obtiene el ID del carrito de los parámetros de la ruta
    const { cid } = req.params;
    // Elimina todos los productos del carrito utilizando el DAO de carrito
    const cart = await cartDao.clearProductsToCart(cid);
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

export default router;