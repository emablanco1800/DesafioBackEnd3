import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import { connectMongoDB } from "./config/mongoDB.config.js";

const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); // Inicia el motor del la plantilla
app.set("views", __dirname + "/views"); // Indicamos que ruta se encuentras las vistas
app.set("view engine", "handlebars"); // Indicamos con que motor vamos a utilizar las vistas
app.use(express.static("public"));

// Rutas de la api
app.use("/api", routes);

// Ruta de las vistas
app.use("/", viewsRoutes)

const httpServer = app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Nuevo usuario Conectado");
  socket.removeAllListeners("products");
  const products = await productManager.getProducts();
  io.emit("products", products);

});

// ===================================================================//
// Configuracion de socket para ProducManager y cartManager juntos

// const httpServer = app.listen(8080, async () => {
//   console.log("Servidor escuchando en el puerto 8080");
//   const products = await productManager.getProducts();
//   io.emit("products", products);

//   const carts = await cartManager.getCarts();
//   io.emit("carts", carts);
// });

// // Configuramos socket
// export const io = new Server(httpServer);

// io.on("connection", (socket) => {
//   console.log("Nuevo usuario Conectado");
// });