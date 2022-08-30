import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { Operation } from "../entities/operationEntity";

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

      return res.status(200).json({ operations: userOperations });
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

      const convertedDate = new Date(date);

      const newOperation = new Operation(name, type, amount, convertedDate, id);

      const createdOperation = await prisma.operation.create({
        data: newOperation,
      });

      return res.status(200).json({ operation: createdOperation, message: "Operation created!" });
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

      return res
        .status(200)
        .json({ message: "Operations deleted successfully." });
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

      return res
        .status(200)
        .json({ message: "Operation deleted successfully." });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
