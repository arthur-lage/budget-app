import { Router } from "express";
import { prisma } from "../database/prisma";

import { v4 as uuid } from "uuid";

const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({});

    return res.status(200).json(users);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

userRoutes.post("/", async (req, res) => {
  try {
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

userRoutes.post("/login", async (req, res) => {
  try {
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

userRoutes.delete("/", async (req, res) => {
  try {
    await prisma.user.deleteMany({});

    return res.status(200).json({ message: "Users deleted." });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

userRoutes.delete("/:id", async (req, res) => {
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
});

export { userRoutes };
