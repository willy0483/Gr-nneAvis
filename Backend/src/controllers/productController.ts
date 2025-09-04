import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        price: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getRecordsFromCategory = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const data = await prisma.product.findMany({
      where: {
        category: {
          slug: slug,
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        price: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const data = await prisma.product.findFirst({
      where: { slug: slug },
    });
    if (!data) res.status(404).json({ error: "Product not found" });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { name, image, description, price, categoryId } = req.body;
  const userId = req.user?.id;

  if (!name || !image || !description || !price || !categoryId) {
    res.status(400).json({ error: "All fields are required" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        image,
        description,
        price,
        slug: name.toLowerCase().replace(/\s+/g, "-"), // Example slug generation
        userId: Number(userId),
        categoryId: Number(categoryId),
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, image, description, price, categoryId } = req.body;

  try {
    const dataToUpdate: any = {
      name,
      image,
      description,
      price,
      categoryId,
    };

    const data = await prisma.product.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export const getRecordsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const data = await prisma.product.findMany({
      where: { userId: Number(userId) },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        price: true,
        description: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user products" });
  }
};
