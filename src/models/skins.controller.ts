import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

export class SkinsController {
    public async getAll(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const skins = await prisma.skins.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        return res.json(skins);
    }

    public async getById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const skins = await prisma.skins.findUnique({
            where: {
                id: req.params.id,
            },
        });

        return res.json(skins);
    }

    public async getByBundleId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const skins = await prisma.skins.findMany({
            where: {
                id_bundle: req.params.id,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return res.json(skins);
    }

    public async getByWeaponId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const skins = await prisma.skins.findMany({
            where: {
                id_weapon: req.params.id,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return res.json(skins);
    }

    public async getByBundleIdAndWeaponId(req: Request, res: Response) {
        const prisma = new PrismaClient();
        console.log(req.params.id_bundle, req.params.id_weapon);
        const skins = await prisma.skins.findMany({
            where: {
                id_bundle: req.params.id_bundle,
                id_weapon: req.params.id_weapon,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return res.json(skins);
    }
}
