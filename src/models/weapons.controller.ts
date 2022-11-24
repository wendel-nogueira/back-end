import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class WeaponsController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const weapons = await prisma.weapons.findMany();

        return res.json(weapons);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const weapons = await prisma.weapons.findUnique({
            where: {
                id: req.params.id,
            },
        });

        return res.json(weapons);
    }
}
