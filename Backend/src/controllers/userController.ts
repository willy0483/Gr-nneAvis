import { Request, RequestHandler, Response } from 'express';
import { prisma } from '../prisma.js';
import bcrypt from 'bcrypt';
import { toBoolean } from '../utils/formatter.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true
      }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        address: true,
        zipcode: true,
        city: true,
        email: true,
        hasNewsletter: true,
        hasNotification: true,
        isActive: true
      }
    });
    if (!user) res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { firstname, lastname, address, zipcode, city, email, password, hasNewsletter, hasNotification, refreshToken, isActive } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        address,
        zipcode: Number(zipcode),
        city,
        email,
        password: hashedPassword,
        hasNewsletter: Boolean(hasNewsletter),
        hasNotification: Boolean(hasNotification),
        refreshToken,
        isActive: Boolean(isActive),
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname, address, zipcode, city, email, password, hasNewsletter, hasNotification, refreshToken, isActive } = req.body;

  const isActiveParsed =
    isActive === 'true' || isActive === true || isActive === 1 || isActive === '1';

  try {
    const dataToUpdate: any = {
      firstname,
      lastname,
      address,
      zipcode,
      city,
      email,
      hasNewsletter: toBoolean(hasNewsletter),
      hasNotification: toBoolean(hasNotification),
      refreshToken,
      isActive: isActiveParsed,
    };

    // Hash password only if provided
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};