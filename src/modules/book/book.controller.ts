import { Request, Response } from 'express';
import Book from './book.model';




const createBook = async (req: Request, res: Response) => {

    try {
        const data = await Book.create(req.body);

        res.send({
            success: true,
            message: 'Book created successfully',
            data
        });

    } catch (error) {

        res.status(400).send({
            message: error.message,
            success: false,
            error: {
                name: error.name || 'Error',
                // message: error.message || "An error occurred during book creation",
                ...error,
            },
        });

    }

};

const getBooks = async (req: Request, res: Response) => {
    try {
        const data = await Book.find();
        res.send({
            success: true,
            message: 'Books retrieved successfully',
            data,
        });
    } catch (error) {
        res.status(404).send({
            message: error.message,
            success: false,
            error: {
                name: error.name || 'NotFoundError',
                message: error.message || 'No books matched the search criteria',
            },
        });

    }
};

const getBookById = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findById(bookId);
        res.send({
            success: true,
            message: 'Book retrieved successfully',
            data,
        });
    } catch (error) {
        res.status(404).send({
            message: error.message,
            success: false,
            error: {
                name: error.name || 'NotFoundError',
                message: error.message || 'The requested book does not exist',
            },
        });

    }
};

const updateBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });
        res.send({
            success: true,
            message: 'Book updated successfully',
            data,
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false,
            error: {
                name: error.name || 'UpdateError',
                message: error.message || 'Failed to update the book information',
            },
        });

    }
};


const deleteBookById = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findByIdAndDelete(bookId);
        res.send({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false,
            error: {
                name: error.name || 'DeleteError',
                message: error.message || 'Failed to delete the book',
            },
        });
    }
};

export const bookController = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBookById
};