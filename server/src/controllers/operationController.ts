import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { Operation } from "../entities/operationEntity";
import { recalculateBalance } from "../utils/recalculateBalance";

export const operationController = {
  async getByUser(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { id } = req.user;

      const userOperations = await prisma.operation.findMany({
        where: {
          userId: id,
        },
      });

      const newBalance = recalculateBalance(userOperations);

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          balance: newBalance,
        },
      });

      return res.status(200).json({ newBalance, operations: userOperations });
    } catch (err: any) {
      console.error(err);

      return res.status(500).json({ message: err.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { id } = req.user;
      const { name, type, amount, date } = req.body;

      const currentUser = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!currentUser) {
        return res.status(401).json({ message: "User is not authenticated " });
      }

      let newBalance = 0;

      const currentBalance = currentUser.balance;

      if (type == "expense") {
        newBalance = currentBalance - amount;
      } else if (type == "income") {
        newBalance = currentBalance + amount;
      }

      const convertedDate = date ? new Date(date) : new Date();

      const newOperation = new Operation(name, type, amount, convertedDate, id);

      const createdOperation = await prisma.operation.create({
        data: newOperation,
      });

      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          balance: newBalance,
        },
      });

      return res.status(200).json({
        newBalance,
        operation: createdOperation,
        message: "Operation created!",
      });
    } catch (err: any) {
      console.error(err);

      return res.status(500).json({ message: err.message });
    }
  },

  async deleteAll(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { id } = req.user;

      await prisma.operation.deleteMany({
        where: {
          userId: id,
        },
      });

      const currentUser = await prisma.user.findFirst({
        where: {
          id,
        },
        include: {
          operations: true,
        },
      });

      if (!currentUser) {
        return;
      }

      const newBalance = recalculateBalance(currentUser?.operations);

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          balance: newBalance,
        },
      });

      return res
        .status(200)
        .json({ newBalance, message: "Operations deleted successfully." });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async deleteById(req: Request, res: Response) {
    try {
      //@ts-ignore
      const { id } = req.user;
      const { operationId } = req.params;

      await prisma.operation.deleteMany({
        where: {
          id: operationId,
          userId: id,
        },
      });

      const currentUser = await prisma.user.findFirst({
        where: {
          id,
        },
        include: {
          operations: true,
        },
      });

      if (!currentUser) {
        return;
      }

      const newBalance = recalculateBalance(currentUser?.operations);

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          balance: newBalance,
        },
      });

      return res
        .status(200)
        .json({ newBalance, message: "Operation deleted successfully." });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
