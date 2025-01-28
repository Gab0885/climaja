import { Request, Response } from 'express';

export const renderLoginPage = (req: Request, res: Response) => {
    res.render('login');
};

export const renderRegisterPage = (req: Request, res: Response) => {
    res.render('register');
};