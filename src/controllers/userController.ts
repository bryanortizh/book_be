import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserByEmail,
  getUserById,
  loginUser,
  logoutUser,
  updateUser,
  User,
} from "../models/userModel";

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { Nombres, Correo, Password } = req.body;
      console.log(req.body);
      const user: User = { Nombres, Correo, Password };
      const userId = await createUser(user);
      res.status(201).json({ id: userId, ...user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const correo = req.query.correo;
      if (typeof correo !== "string") {
        return res.status(400).json({ message: "Correo inválido" });
      }
      const user = await getUserByEmail(correo);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { Nombres } = req.body;

      const row = await this.validateUserId(id);
      if (!row) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      await updateUser(id, Nombres);

      res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario" });
    }
  }

  async validateUserId(id: string): Promise<boolean> {
    const user = await getUserById(id);
    return user !== null;
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result: any = await deleteUser(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { Correo, Password } = req.body;
      console.log(req.body);
      const user = await getUserByEmail(Correo);
      if (!user || user.Password !== Password) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
      const result: any = await loginUser(Correo, Password);

      res.status(200).json({ message: "Inicio de sesión exitoso", result });
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
  }

  async logoutUser(req: Request, res: Response) {
    try {
      const { Correo } = req.body;
      console.log("Logout request for:", Correo);
      await logoutUser(Correo);

      res.status(200).json({ message: "Sesión cerrada exitosamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { Correo, Password } = req.body;
      console.log(req.body, "sd");
      await forgotPassword(Correo, Password);
      res.status(200).json({
        message: "Solicitud de restablecimiento de contraseña correcta",
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
