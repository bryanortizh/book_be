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
exports.getAllProductos = exports.getProductoById = exports.createProducto = void 0;
const db_1 = require("../config/db");
const createProducto = (producto) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [result] = yield db.execute('INSERT INTO producto (Detalle, Descripcion, Valor, Stock) VALUES (?, ?, ?, ?)', [producto.Detalle, producto.Descripcion, producto.Valor, producto.Stock]);
    return result.insertId;
});
exports.createProducto = createProducto;
const getProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [rows] = yield db.execute('SELECT * FROM producto WHERE Id = ?', [id]);
    return rows.length ? rows[0] : null;
});
exports.getProductoById = getProductoById;
const getAllProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.getDb)();
    const [rows] = yield db.execute('SELECT * FROM producto');
    return rows;
});
exports.getAllProductos = getAllProductos;
