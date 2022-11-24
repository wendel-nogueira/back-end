import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class CardsController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const cards = await prisma.cards.findMany();

        return res.json(cards);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const cards = await prisma.cards.findUnique({
            where: {
                id: req.params.id,
            },
        });

        return res.json(cards);
    }

    public async getByBundleId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const cards = await prisma.cards.findMany({
            where: {
                id_bundle: req.params.id,
            },
        });

        return res.json(cards);
    }
}
