import { Request, Response } from "express";
import { createProducto, getAllProductos, getProductoById, Producto } from "../models/productoModel";

export class ProductoController {
    async createProducto(req: Request, res: Response) {
        try {
            const { Detalle, Descripcion, Valor, Stock } = req.body;
            const producto: Producto = { Detalle, Descripcion, Valor, Stock };
            const productoId = await createProducto(producto);
            res.status(201).json({ id: productoId, ...producto });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllProductos(req: Request, res: Response) {
        try {
            const productos = await getAllProductos();
            res.status(200).json(productos);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProducto(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const producto = await getProductoById(id);
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.status(200).json(producto);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}