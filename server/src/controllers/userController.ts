import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { User } from "../entities/userEntity";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export const userController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({});

      return res.status(200).json(users);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findFirst({
        where: { id },
      });

      return res.status(200).json(user);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!validateName(name)) {
        return res.status(400).json({
          message:
            "Invalid name. It should have at least 2 characters, up to 24 characters.",
        });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({
          message: "Invalid email. It should look like email@example.com.",
        });
      }

      if (!validatePassword(password)) {
        return res.status(400).json({
          message:
            "Invalid password. It should have at least 6 characters up to 16 characters.",
        });
      }

      const emailExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (emailExists) {
        return res
          .status(409)
          .json({ message: "This email is already being used." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User(name, email, hashedPassword);

      await prisma.user.create({
        data: newUser,
      });

      const token = generateToken(newUser.id, "7d");

      return res
        .status(200)
        .json({ token, message: "User created successfully" });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!validateEmail(email)) {
        return res.status(400).json({
          message: "Invalid email. It should look like email@example.com",
        });
      }

      if (!validatePassword(password)) {
        return res.status(400).json({
          message:
            "Invalid password. It should have at least 6 characters up to 16 characters",
        });
      }

      const currentUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!currentUser) {
        return res.status(400).json({ message: "Invalid user credentials." });
      }

      const isPassword = await bcrypt.compare(password, currentUser.password);

      if (!isPassword) {
        return res.status(400).json({ message: "Invalid user credentials." });
      }

      const token = generateToken(currentUser.id, "7d");

      return res
        .status(200)
        .json({ token, message: "User logged in successfully" });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async deleteAll(req: Request, res: Response) {
    try {
      await prisma.user.deleteMany({});

      return res.status(200).json({ message: "Users deleted." });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.user.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({ message: `User with id ${id} deleted.` });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async auth(req: Request, res: Response) {
    try {
      //@ts-ignore
      if (!req.user) {
        return res.status(401).json({ message: "Invalid user authentication" });
      }

      //@ts-ignore
      const { id } = req.user;

      const currentUser = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      const userInfo = {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
        //@ts-ignore
        expenses: currentUser?.expenses,
        //@ts-ignore
        incomes: currentUser?.incomes,
      };

      return res
        .status(200)
        .json({ user: userInfo, message: "User authenticated successfully." });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
