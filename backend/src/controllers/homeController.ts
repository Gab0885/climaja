import { Request, Response } from 'express';

export const renderHomePage = (req: Request, res: Response) => {
    res.render('homePage', { user: res.locals.user });
};