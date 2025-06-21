import { Request, Response } from 'express';
import Borrow from './borrow.model';



const createBorrow = async (req: Request, res: Response) => {

    try {
        const checkInventory = await Borrow.checkInventory(req.body.book as string, req.body.quantity);
        if (!checkInventory) throw new Error('Book not available');

        const borrow = await Borrow.create(req.body);

        res.send({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });

    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');

        res.status(400).send({
            message: err.message,
            success: false,
            error: {
                name: err.name,
                message: err.message,
            },
        });
    }

};

const getBorrows = async (req: Request, res: Response) => {
    // const borrow = await Borrow.find();  
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books', // collection name must match actual MongoDB collection (usually plural and lowercase)
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            {
                $unwind: '$bookInfo'
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    }
                }
            }
        ]);

        res.send({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary
        });

    } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        res.status(400).send({
            message: err.message,
            success: false,
            error: {
                name: err.name,
                message: err.message,
            },
        });
    }
};


export const borrowController = {
    createBorrow,
    getBorrows
};