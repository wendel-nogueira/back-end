import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class LevelsController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const level = await prisma.$queryRawUnsafe('SELECT * FROM level');

        return res.json(level);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const level = await prisma.$queryRawUnsafe('SELECT * FROM level WHERE id = ' + req.params.id);

        return res.json(level);
    }

    public async getBySkinId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const level = await prisma.$queryRawUnsafe('SELECT * FROM level WHERE id_skin = ' + req.params.id);

        return res.json(level);
    }
}
