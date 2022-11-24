import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class BundlesController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const bundles = await prisma.bundle.findMany();

        return res.json(bundles);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const bundle = await prisma.bundle.findUnique({
            where: {
                id: req.params.id,
            },
        });

        return res.json(bundle);
    }
}
