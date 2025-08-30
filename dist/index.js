"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const userRoutes_1 = require("./routes/userRoutes");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_1.connectDB)();
(0, userRoutes_1.setUserRoutes)(app);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
