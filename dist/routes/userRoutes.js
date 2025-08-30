"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRoutes = void 0;
const userController_1 = require("../controllers/userController");
const productoController_1 = require("../controllers/productoController");
const userController = new userController_1.UserController();
const productoController = new productoController_1.ProductoController();
function setUserRoutes(app) {
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
exports.setUserRoutes = setUserRoutes;
