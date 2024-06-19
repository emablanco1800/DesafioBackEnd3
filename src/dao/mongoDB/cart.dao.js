import { cartModel } from "./models/cart.model.js";

// Función que devuelve todos los carritos
const getAll = async () => {
  const carts = await cartModel.find();  // Busca todos los documentos en la colección de cart
  return carts;  // Devuelve la lista de carritos
};

// Función que devuelve un carrito por su ID
const getById = async (id) => {
  const cart = await cartModel.findById(id);  // Busca el documento con el ID proporcionado en la colección de cart
  cart.populate("products.product");    // Población de los productos en el carrito
  return cart;    // Devuelve el carrito
};

// Función que crea un nuevo carrito
const create = async () => {
  const cart = await cartModel.create({});    // Crea un nuevo documento en la colección de cart
  return cart;    // Devuelve el carrito recién creado
};

// Función que actualiza un carrito
const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });    // Busca el documento con el ID proporcionado en la colección de cart
  return cartUpdate;    // Devuelve el carrito actualizado
};

// Función que elimina un carrito
const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });    // Elimina el documento con el ID proporcionado en la colección de cart
  return cart;    // Devuelve el resultado de la eliminación
};

// Función que agrega un producto a un carrito
const addProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);    // Busca el carrito con el ID proporcionado
  const productInCart = cart.products.find((element) => element.product == pid);     // Busca el producto con el ID proporcionado dentro del carrito
  // Si el producto ya está en el carrito, incrementa su cantidad
  if (productInCart) {
    productInCart.quantity++;
  } else {
    // Si no está, agrega el producto al carrito con una cantidad inicial de 1
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save();   // Guarda los cambios en la base de datos de MongoDB
  return cart;   // Devuelve el carrito actualizado
};

// Función que elimina un producto de un carrito
const deleteProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);    // Busca el carrito con el ID proporcionado
  cart.products = cart.products.filter((element) => element.product != pid);   // Filtra los productos del carrito para eliminar el producto con el ID proporcionado
  await cart.save();    // Guarda los cambios en la base de datos de MongoDB
  return cart;    // Devuelve el carrito actualizado
};

// Función que actualiza la cantidad de un producto en un carrito
const updateQuantityProductInCart = async (cid, pid, quantity) => {   // Intenta encontrar el carrito con el ID proporcionado
  try {
    const cart = await cartModel.findById(cid);
    const product = cart.products.find(element => element.product.toString() === pid);     // Busca el producto con el ID proporcionado dentro del carrito
    if (!product) {
      // Si no se encuentra el producto, devuelve un error
      return { error: 'El producto no se encuentra en el carrito' };
    }
    // Actualiza la cantidad del producto en el carrito
    product.quantity = quantity;     // Guarda los cambios en la base de datos de MongoDB
    await cart.save();     // Devuelve el carrito actualizado
    return cart;
  } catch (error) {     // Maneja el error si ocurre
    console.error('Error al actualizar la cantidad del producto en el carrito:', error);
    return { error: 'Ocurrió un error al actualizar la cantidad del producto' };
  }
};

// Función que elimina todos los productos de un carrito
const clearProductsToCart = async (cid) => {
  const cart = await cartModel.findById(cid);   // Busca el carrito con el ID proporcionado
  cart.products = [];   // Elimina todos los productos del carrito
  await cart.save();   // Guarda los cambios en la base de datos de MongoDB
  return cart;   // Devuelve el carrito actualizado
};
export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart
};