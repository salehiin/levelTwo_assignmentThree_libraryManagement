import { model, Schema } from 'mongoose';
import { IBook } from './book.interface';



const bookSchema = new Schema<IBook>({
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    genre: { type: String, enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'], required: true },
    isbn: { type: String, trim: true, unique: true, required: true },
    description: { type: String, trim: true },
    copies: { type: Number, min: 0, required: true },
    available: { type: Boolean, default: true }
}, {timestamps: true});

const Book = model<IBook>('Book', bookSchema);
export default Book;
