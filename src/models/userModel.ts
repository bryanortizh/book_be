import { getDb } from "../config/db";

export interface User {
  Id?: number;
  Nombres: string;
  Correo: string;
  Password: string;
  Login?: boolean;
}

export const createUser = async (user: User): Promise<number> => {
  const db = getDb();
  const [result]: any = await db.execute(
    "INSERT INTO user (Nombres, Correo, Password) VALUES (?, ?, ?)",
    [user.Nombres, user.Correo, user.Password]
  );
  return result.insertId;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const db = getDb();
  const [rows]: any = await db.execute("SELECT * FROM user WHERE Correo = ?", [
    email,
  ]);
  return rows.length ? (rows[0] as User) : null;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const db = getDb();
  const [rows]: any = await db.execute("SELECT * FROM user WHERE Id = ?", [id]);
  return rows.length ? (rows[0] as User) : null;
};

export const getAllUsers = async (): Promise<User[]> => {
  const db = getDb();
  const [rows]: any = await db.execute("SELECT * FROM user");
  return rows as User[];
};

export const updateUser = async (id: string, Nombre: string): Promise<void> => {
  const db = getDb();
  const [result]: any = await db.execute(
    "UPDATE user SET Nombres = ? WHERE Id = ?",
    [Nombre, id]
  );
};

export const deleteUser = async (id: string): Promise<any> => {
  const db = getDb();
  const [result]: any = await db.execute("DELETE FROM user WHERE Id = ?", [id]);
  return result;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const db = getDb();
  const [rows]: any = await db.execute(
    "SELECT * FROM user WHERE Correo = ? AND Password = ?",
    [email, password]
  );
  await db.execute("UPDATE user SET Login = ? WHERE Correo = ?", ["1", email]);

  return rows.length ? (rows[0] as User) : null;
};

export const logoutUser = async (email: string): Promise<void> => {
  const db = getDb();
  await db.execute("UPDATE user SET Login = ? WHERE Correo = ?", ["0", email]);
};

export const forgotPassword = async (correo: string, newPassword: string): Promise<void> => {
  const db = getDb();
  await db.execute("UPDATE user SET Password = ? WHERE Correo = ?", [newPassword, correo]);
};
