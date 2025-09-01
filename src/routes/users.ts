import { Router } from "express";
import type { UserInterface } from "../types/user.types.ts";
import prisma from "../config/prisma.js";

const app = Router();

app.post("/", async (req, res) => {
  try {
    const userData: UserInterface = req.body;
    const user = await prisma.user.create({
      data: userData,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.put("/:email", async (req, res) => {
  const userData = await getUser(req);
  if (userData) {
    const updatedUser = await prisma.user.update({
      where: {
        email: req.params.email,
      },
      data: req.body,
    });
    res.json("Updated successfully");
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

async function getUser(res: any) {
  return await prisma.user.findUnique({
    where: {
      email: res.params.email,
    },
  });
}

export default app;
