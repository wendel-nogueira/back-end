import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { getConnections } from '../utils';

export class ReportsController {
    public async handle(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { primaryTable, secondaryTables } = req.body;
        let principalTable = primaryTable.table;
        const principalFields: object = {};
        const principalOrder = primaryTable.order;
        const connections = getConnections();

        if (principalTable === 'bundles' || principalTable === 'chromas' || principalTable === 'levels' || principalTable === 'sprays' || principalTable === 'titles') {
            principalTable = principalTable.slice(0, -1);
        }

        for (const field of primaryTable.fields) {
            principalFields[field.name] = true;
        }

        Object.keys(principalOrder).forEach((key) => {
            if (principalOrder[key] === '') {
                delete principalOrder[key];
            } else {
                principalOrder[key] = principalOrder[key].toLowerCase();
            }
        });

        let primaryTableData: object[];

        if (principalTable === 'chroma' || principalTable === 'level' || principalTable === 'weaponsinfo') {
            let orderby = '';

            for (const key in principalOrder) {
                orderby += key + ' ' + principalOrder[key] + ',';
            }

            primaryTableData = await prisma.$queryRawUnsafe(`SELECT * FROM ${principalTable} ORDER BY ${orderby.slice(0, -1)}`);
        } else {
            primaryTableData = await prisma[principalTable].findMany({
                select: principalFields,
                orderBy: principalOrder,
            });
        }

        for (const secondaryTable of secondaryTables) {
            let complementTable = secondaryTable.table;
            const secondaryFields: object = {};
            const secondaryOrder = secondaryTable.order;

            if (complementTable === 'bundles' || complementTable === 'chromas' || complementTable === 'levels' || complementTable === 'sprays' || complementTable === 'titles') {
                complementTable = complementTable.slice(0, -1);
            }

            for (const field of secondaryTable.fields) {
                secondaryFields[field.name] = true;
            }

            Object.keys(secondaryOrder).forEach((key) => {
                if (secondaryOrder[key] === '') {
                    delete secondaryOrder[key];
                } else {
                    secondaryOrder[key] = secondaryOrder[key].toLowerCase();
                }
            });

            for (const primaryTableItem of primaryTableData) {
                if (primaryTableItem[connections[principalTable][complementTable][0]] !== null) {
                    console.log(complementTable)
                    const secondaryTableData = await prisma[complementTable].findMany({
                        where: {
                            [connections[principalTable][complementTable][1]]: primaryTableItem[connections[principalTable][complementTable][0]],
                        },
                        select: secondaryFields,
                        orderBy: secondaryOrder,
                    });

                    primaryTableItem['complement'] = {
                        [complementTable]: secondaryTableData,
                    }
                }
            }
        }

        return res.json(primaryTableData);
    }
}