import { Router } from "express";
import { UserController } from "../controllers/userController";
import { ProductoController } from "../controllers/productoController";

const userController = new UserController();
const productoController = new ProductoController();

export function setUserRoutes(app: Router) {
  app.post("/users", userController.createUser.bind(userController));
  app.get("/users", userController.getAllUsers.bind(userController));
  app.get("/users/search", userController.getUser.bind(userController));
  app.put("/users/:id", userController.updateUser.bind(userController));
  app.delete("/users/:id", userController.deleteUser.bind(userController));
  app.post("/loginUser", userController.loginUser.bind(userController));
  app.post("/logout", userController.logoutUser.bind(userController));
  app.put("/usersPassword", userController.forgotPassword.bind(userController));
  app.get("/productos", productoController.getAllProductos.bind(productoController));
  app.get("/product/search/:id", productoController.getProducto.bind(productoController));
  app.post("/productos", productoController.createProducto.bind(productoController));
}
