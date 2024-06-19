import { cartModel } from "./models/cart.model.js";

const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

const getById = async (id) => {
  const cart = await cartModel.findById(id).populate("products.product");
  return cart;
};

const create = async () => {
  const cart = await cartModel.create({});

  return cart;
};

const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};

const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

const addProductToCart = async (cid, pid) => {

  const cart = await cartModel.findById(cid);

  const productInCart = cart.products.find((element) => element.product == pid);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save(); // Guardamos los cambios realizado en la base de datos de mongo
  return cart;
};

const deleteProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);

  cart.products = cart.products.filter((element) => element.product != pid);

  await cart.save();

  return cart;
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  // Intenta encontrar el carrito con el ID proporcionado
  try {
    const cart = await cartModel.findById(cid);
    // Busca el producto con el ID proporcionado dentro del carrito
    const product = cart.products.find(element => element.product.toString() === pid);
    if (!product) {
      return { error: 'El producto no se encuentra en el carrito' };
    }

    product.quantity = quantity; // Actualiza la cantidad del producto en el carrito
    await cart.save(); // Guarda los cambios en el carrito
    return cart;  // Devuelve el carrito actualizado
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto en el carrito:', error);
    return { error: 'Ocurrió un error al actualizar la cantidad del producto' };
  }
};

const clearProductsToCart = async (cid) => {

  const cart = await cartModel.findById(cid);
  cart.products = []

  await cart.save()

  return cart;
  
}
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
