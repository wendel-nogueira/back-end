import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class BuddiesController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const buddies = await prisma.buddies.findMany();

        return res.json(buddies);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const buddies = await prisma.buddies.findUnique({
            where: {
                id: req.params.id,
            },
        });

        return res.json(buddies);
    }

    public async getByBundleId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const buddies = await prisma.buddies.findMany({
            where: {
                id_bundle: req.params.id,
            },
        });

        return res.json(buddies);
    }
}
