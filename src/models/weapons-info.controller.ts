import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class WeaponsInfoController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const weaponsInfo = await prisma.$queryRawUnsafe('SELECT * FROM weaponsinfo');

        return res.json(weaponsInfo);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const weaponsInfo = await prisma.$queryRawUnsafe('SELECT * FROM weaponsinfo WHERE id = ' + req.params.id);

        return res.json(weaponsInfo);
    }

    public async getByWeaponId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const weaponsInfo = await prisma.$queryRawUnsafe('SELECT * FROM weaponsinfo WHERE id_weapon = ' + req.params.id);

        return res.json(weaponsInfo);
    }
}
