import { Request, Response } from "express";
import { grpcClient } from "../grpc-client";

export const userController = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const { limit = 10, page = 1, search } = req.query;

      const response = await grpcClient.getUsers(
        Number(limit),
        Number(page),
        search as string
      );

      res.json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message});
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const response = await grpcClient.getUser(id);
      res.json(response);
    } catch (error: any) {
      if (error.message.includes("not found")) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const { last_name, first_name, patronymic, email } = req.body;

      if (!last_name || !first_name || !email) {
        return res.status(400).json({
          error: "Required fields are missing",
        });
      }

      const response = await grpcClient.createUser({
        last_name,
        first_name,
        patronymic,
        email,
      });

      res.status(201).json(response);
    } catch (error: any) {
      if (error.message.includes("already exists")) {
        return res.status(409).json({ error: "User already exists" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // TODO: Реализовать метод UpdateUser в gRPC сервисе
      // const response = await grpcClient.updateUser(id, updates);
      // res.json(response);

      res.status(501).json({ error: "Not implemented yet" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await grpcClient.deleteUser(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes("not found")) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
