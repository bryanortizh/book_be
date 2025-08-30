"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userModel_1 = require("../models/userModel");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Nombres, Correo, Password } = req.body;
                console.log(req.body);
                const user = { Nombres, Correo, Password };
                const userId = yield (0, userModel_1.createUser)(user);
                res.status(201).json(Object.assign({ id: userId }, user));
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, userModel_1.getAllUsers)();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const correo = req.query.correo;
                if (typeof correo !== "string") {
                    return res.status(400).json({ message: "Correo inválido" });
                }
                const user = yield (0, userModel_1.getUserByEmail)(correo);
                if (!user) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { Nombres } = req.body;
                const row = yield this.validateUserId(id);
                if (!row) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
                yield (0, userModel_1.updateUser)(id, Nombres);
                res.status(200).json({ message: "Usuario actualizado exitosamente" });
            }
            catch (error) {
                res.status(500).json({ message: "Error al actualizar el usuario" });
            }
        });
    }
    validateUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, userModel_1.getUserById)(id);
            return user !== null;
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield (0, userModel_1.deleteUser)(id);
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
                res.status(200).json({ message: "Usuario eliminado exitosamente" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Correo, Password } = req.body;
                console.log(req.body);
                const user = yield (0, userModel_1.getUserByEmail)(Correo);
                if (!user || user.Password !== Password) {
                    return res.status(401).json({ message: "Credenciales inválidas" });
                }
                const result = yield (0, userModel_1.loginUser)(Correo, Password);
                res.status(200).json({ message: "Inicio de sesión exitoso", result });
            }
            catch (error) {
                res.status(500).json({ message: "Error al iniciar sesión" });
            }
        });
    }
    logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Correo } = req.body;
                console.log("Logout request for:", Correo);
                yield (0, userModel_1.logoutUser)(Correo);
                res.status(200).json({ message: "Sesión cerrada exitosamente" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Correo, Password } = req.body;
                console.log(req.body, "sd");
                yield (0, userModel_1.forgotPassword)(Correo, Password);
                res.status(200).json({
                    message: "Solicitud de restablecimiento de contraseña correcta",
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
