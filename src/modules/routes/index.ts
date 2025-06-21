import { Router } from 'express';
import bookRoute from '../books/books.route';
import borrowRoute from '../borrow/borrow.route';


const routes = Router();

routes.use('/books', bookRoute);
routes.use('/borrow', borrowRoute);

export default routes;