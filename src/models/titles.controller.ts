import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class TitlesController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const title = await prisma.title.findMany();

        return res.json(title);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const title = await prisma.title.findUnique({
            where: {
                id: req.params.id,
            },
        });

        return res.json(title);
    }

    public async getByBundleId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const title = await prisma.title.findMany({
            where: {
                id_bundle: req.params.id,
            },
        });

        return res.json(title);
    }
}
