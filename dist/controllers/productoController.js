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
exports.ProductoController = void 0;
const productoModel_1 = require("../models/productoModel");
class ProductoController {
    createProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Detalle, Descripcion, Valor, Stock } = req.body;
                const producto = { Detalle, Descripcion, Valor, Stock };
                const productoId = yield (0, productoModel_1.createProducto)(producto);
                res.status(201).json(Object.assign({ id: productoId }, producto));
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getAllProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productos = yield (0, productoModel_1.getAllProductos)();
                res.status(200).json(productos);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const producto = yield (0, productoModel_1.getProductoById)(id);
                if (!producto) {
                    return res.status(404).json({ message: "Producto no encontrado" });
                }
                res.status(200).json(producto);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.ProductoController = ProductoController;
