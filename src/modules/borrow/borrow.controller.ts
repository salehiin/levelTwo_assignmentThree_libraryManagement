import { Request, Response } from 'express';
import Borrow from './borrow.model';



const createBorrow = async (req: Request, res: Response) => {
    const checkInventory = await Borrow.checkInventory(req.body.book as string, req.body.quantity);
    if(!checkInventory) throw new Error('Book not available');
    const borrow = await Borrow.create(req.body);   

    res.send({
        success: true,
        message: 'Book borrowed successfully',
        data: borrow
    });
};

const getBorrows = async (req: Request, res: Response) => {
    const borrow = await Borrow.find();  

    res.send({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data: borrow
    });
};


export const borrowController = {
    createBorrow,
    getBorrows
};