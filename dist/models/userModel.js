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
exports.forgotPassword = exports.logoutUser = exports.loginUser = exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.getUserByEmail = exports.createUser = void 0;
const db_1 = require("../config/db");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [result] = yield db.execute("INSERT INTO user (Nombres, Correo, Password) VALUES (?, ?, ?)", [user.Nombres, user.Correo, user.Password]);
    return result.insertId;
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [rows] = yield db.execute("SELECT * FROM user WHERE Correo = ?", [
        email,
    ]);
    return rows.length ? rows[0] : null;
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [rows] = yield db.execute("SELECT * FROM user WHERE Id = ?", [id]);
    return rows.length ? rows[0] : null;
});
exports.getUserById = getUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [rows] = yield db.execute("SELECT * FROM user");
    return rows;
});
exports.getAllUsers = getAllUsers;
const updateUser = (id, Nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [result] = yield db.execute("UPDATE user SET Nombres = ? WHERE Id = ?", [Nombre, id]);
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [result] = yield db.execute("DELETE FROM user WHERE Id = ?", [id]);
    return result;
});
exports.deleteUser = deleteUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [rows] = yield db.execute("SELECT * FROM user WHERE Correo = ? AND Password = ?", [email, password]);
    yield db.execute("UPDATE user SET Login = ? WHERE Correo = ?", ["1", email]);
    return rows.length ? rows[0] : null;
});
exports.loginUser = loginUser;
const logoutUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    yield db.execute("UPDATE user SET Login = ? WHERE Correo = ?", ["0", email]);
});
exports.logoutUser = logoutUser;
const forgotPassword = (correo, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    yield db.execute("UPDATE user SET Password = ? WHERE Correo = ?", [newPassword, correo]);
});
exports.forgotPassword = forgotPassword;
