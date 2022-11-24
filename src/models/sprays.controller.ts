import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class SpraysController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const spray = await prisma.spray.findMany();

        return res.json(spray);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const spray = await prisma.spray.findUnique({
            where: {
                id: req.params.id,
            },
        });

        return res.json(spray);
    }

    public async getByBundleId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const spray = await prisma.spray.findMany({
            where: {
                id_bundle: req.params.id,
            },
        });

        return res.json(spray);
    }
}
