import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import { getConnections } from '../utils';

export class ReportsController {
    public async handle(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { primaryTable, secondaryTables } = req.body;
        const principalFields: object = {};
        const connections = getConnections();

        if (!primaryTable) {
            return res.status(400).json({ error: 'Table is required' });
        }

        let principalTable = primaryTable.table;
        const principalOrder = primaryTable.order;

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
            let orderby = 'ORDER BY ';
            let i = 0;

            for (const key in principalOrder) {
                orderby += key + ' ' + principalOrder[key] + ',';
                i++;
            }

            orderby = orderby.slice(0, -1);

            if (i === 0) {
                orderby = '';
            }
            
            const query = `SELECT * FROM ${principalTable} ${orderby.slice(0, -1)}`;
            primaryTableData = await prisma.$queryRawUnsafe(query);
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
                    let secondaryTableData = {};

                    if (complementTable === 'chroma' || complementTable === 'level' || complementTable === 'weaponsinfo') {
                        const query = `SELECT * FROM ${complementTable} WHERE ${connections[principalTable][complementTable][1]} = ${ "'" + primaryTableItem[connections[principalTable][complementTable][0]] + "'"}`;
                        secondaryTableData = await prisma.$queryRawUnsafe(query);
                    } else {
                        secondaryTableData = await prisma[complementTable].findMany({
                            where: {
                                [connections[principalTable][complementTable][1]]: primaryTableItem[connections[principalTable][complementTable][0]],
                            },
                            select: secondaryFields,
                            orderBy: secondaryOrder,
                        });
                    }

                    primaryTableItem['complement'] = {
                        ...primaryTableItem['complement'],
                        [complementTable]: secondaryTableData,
                    }
                }
            }
        }

        return res.json(primaryTableData);
    }
}