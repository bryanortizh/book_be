import { getDb } from "../config/db";

export interface Producto {
    Id?: number;
    Detalle: string;
    Descripcion: string;
    Valor: number;
    Stock: number;
}

export const createProducto = async (producto: Producto): Promise<number> => {
    const db = getDb();
    const [result]: any = await db.execute(
        'INSERT INTO producto (Detalle, Descripcion, Valor, Stock) VALUES (?, ?, ?, ?)',
        [producto.Detalle, producto.Descripcion, producto.Valor, producto.Stock]
    );
    return result.insertId;
}

export const getProductoById = async (id: number): Promise<Producto | null> => {
    const db = getDb();
    const [rows]: any = await db.execute(
        'SELECT * FROM producto WHERE Id = ?',
        [id]
    );
    return rows.length ? rows[0] as Producto : null;
};

export const getAllProductos = async (): Promise<Producto[]> => {
    const db = getDb();
    const [rows]: any = await db.execute('SELECT * FROM producto');
    return rows as Producto[];
}