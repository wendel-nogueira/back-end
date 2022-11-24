import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class ChromasController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const chroma = await prisma.$queryRawUnsafe('SELECT * FROM chroma');

        return res.json(chroma);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const chroma = await prisma.$queryRawUnsafe('SELECT * FROM chroma WHERE id = ' + req.params.id);

        return res.json(chroma);
    }

    public async getBySkinId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const chroma = await prisma.$queryRawUnsafe('SELECT * FROM chroma WHERE id_skin = ' + req.params.id);

        return res.json(chroma);
    }
}
