import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
      mongoose.connect("mongodb+srv://admin:upuruwKx92dtALCg@coderback3.xredhse.mongodb.net/productosdb")
      console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}