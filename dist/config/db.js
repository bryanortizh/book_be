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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectDB = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const config = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "cavoshcafe",
};
let connection = null;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connection = yield promise_1.default.createConnection(config);
        console.log("Conexion exitosa a la base de datos");
    }
    catch (error) {
        console.error("Error en la base de datos:", error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
const getDb = () => {
    if (!connection) {
        throw new Error("Base de datos no conectada");
    }
    return connection;
};
exports.getDb = getDb;
