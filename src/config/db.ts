import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "cavoshcafe",
};

let connection: mysql.Connection | null = null;

export const connectDB = async () => {
  try {
    connection = await mysql.createConnection(config);
    console.log("Conexion exitosa a la base de datos");
  } catch (error) {
    console.error("Error en la base de datos:", error);
    process.exit(1);
  }
};

export const getDb = () => {
  if (!connection) {
    throw new Error("Base de datos no conectada");
  }
  return connection;
};
