import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router();

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    // Obtiene los parámetros de consulta
    const { limit, page, sort, category, status } = req.query;
    // Configura las opciones para la consulta
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      learn: true,
    };

    // Si se solicita por categoría
    if (category) {
      // Obtiene todos los productos de la categoría especificada
      const products = await productDao.getAll({ category }, options);
      return res.status(200).json({ status: "success", products });
    }

    // Si se solicita por estado
    if (status) {
      // Obtiene todos los productos con el estado especificado
      const products = await productDao.getAll({ status }, options);
      return res.status(200).json({ status: "success", products });
    }

    // Si no se especifica categoría ni estado, obtiene todos los productos
    const products = await productDao.getAll({}, options);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Ruta para obtener un producto por su ID
router.get("/:pid", async (req, res) => {
  try {
    // Obtiene el ID del producto de los parámetros de la ruta
    const { pid } = req.params;
    // Obtiene el producto utilizando el DAO de productos
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
    res.status(200).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Ruta para eliminar un producto
router.delete("/:pid", async (req, res) => {
  try {
    // Obtiene el ID del producto de los parámetros de la ruta
    const { pid } = req.params;
    // Elimina el producto utilizando el DAO de productos
    const product = await productDao.deleteOne(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
    res.status(200).json({ status: "success", msg: `El producto con el id ${pid} fue eliminado` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Ruta para actualizar un producto
router.put("/:pid", async (req, res) => {
  try {
    // Obtiene el ID del producto de los parámetros de la ruta
    const { pid } = req.params;
    // Obtiene los datos del producto del cuerpo de la solicitud
    const productData = req.body;
    // Actualiza el producto utilizando el DAO de productos
    const product = await productDao.update(pid, productData);
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
    res.status(200).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Ruta para crear un nuevo producto
router.post("/", checkProductData, async (req, res) => {
  try {
    // Obtiene los datos del producto del cuerpo de la solicitud
    const productData = req.body;
    // Crea un nuevo producto utilizando el DAO de productos
    const product = await productDao.create(productData);
    res.status(201).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

export default router;