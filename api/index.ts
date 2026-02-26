import { Request, Response } from 'express';
// @ts-ignore
import app_handler from '../backend/server';

export default async (req: Request, res: Response) => {
    return app_handler(req, res);
};
