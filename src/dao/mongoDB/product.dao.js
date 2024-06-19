import { productModel } from "./models/product.model.js";

// Función que devuelve todos los productos
const getAll = async (query, options) => {
  // Utiliza el método paginate de Mongoose para obtener los productos
  // con los parámetros de consulta y opciones proporcionados
  const products = await productModel.paginate(query, options);
  // Devuelve los productos obtenidos
  return products;
};

// Función que devuelve un producto por su ID
const getById = async (id) => {
  // Busca el documento con el ID proporcionado en la colección de productos
  const product = await productModel.findById(id);
  // Devuelve el producto encontrado
  return product;
};

// Función que crea un nuevo producto
const create = async (data) => {
  // Crea un nuevo documento en la colección de productos
  const product = await productModel.create(data);
  // Devuelve el producto recién creado
  return product;
};

// Función que actualiza un producto
const update = async (id, data) => {
  // Busca el documento con el ID proporcionado en la colección de productos
  // y lo actualiza con los nuevos datos
  const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
  // Devuelve el producto actualizado
  return productUpdate;
};

// Función que elimina un producto
const deleteOne = async (id) => {
  // Busca el documento con el ID proporcionado en la colección de productos
  // y actualiza su estado a "false" (eliminado)
  const product = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
  // Devuelve el producto eliminado
  return product;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne
};