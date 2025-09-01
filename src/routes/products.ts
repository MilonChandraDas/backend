import { Router } from "express";
import prisma from "../config/prisma.js";
import type { ProductInterface } from "../types/product.types.js";

const app = Router();

app.post("/", async (req, res) => {
  try {
    const productData: ProductInterface = req.body;
    const product = await prisma.product.create({
      data: productData,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

app.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

app.get("/name/:name", async (req, res) => {
  try {
    const product = await getProduct(req);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product" });
  }
});

app.get("/id/:id", async (req, res) => {
  try {
    const product = await getProduct(req);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product" });
  }
});

app.put("/id/:id", async (req, res) => {
  try {
    const productData = await req.body;
    const updatedProduct = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: productData,
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

app.delete("/id/:id", async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

async function getProduct(req: any) {
  if (req.params.name) {
    return await prisma.product.findFirst({
      where: {
        name: req.params.name,
      },
    });
  }
  // If the route parameter is 'id', search by id
  if (req.params.id) {
    return await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });
  }
  return null;
}

export default app;
