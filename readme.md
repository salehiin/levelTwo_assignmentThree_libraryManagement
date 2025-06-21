# library-management-nosql-backend


# user
# book - title - author - genre  - isbn - description (string) - copies (number) - available (boolean)
# borrow - book (objectId) - quantity (number) - dueDate (date)


{
    "name": "Shamima",
    "email": "shamima@bb.bov.bd.com",
    "phone": 845132,
    "role": "User",
    "password": "password"
}

{
  "quantity": 1,
  "book": "",
  "dueDate": "2025-06-29"
}



Video -3



# 1 - api should books not book
# 2 - "__v": 0
# 3 - 6. Borrow a Book
# 4 - Generic Error Response
# 5 - If copies become 0, update available to false (implement this using a static method or instance method).
# 6 - 2. Get All Books
# 7 - 7. Borrowed Books Summary (Using Aggregation)
# 8 - ✨ Bonus Section (10 Marks):
    1. Error Handling: Handle invalid input, 404s, and validation errors clearly
    2. Video Explanation: Short recorded video explaining key features and logic.
    3. Documentation: Well-written README.md with setup and API details.


- video 6 - 15.00






# borrow controller --------------------------------------------------------------------
import { Request, Response } from "express";
import Borrow from "./borrow.model";



const createBorrow = async (req: Request, res: Response) => {
    // const borrow = await Borrow.create(req.body)

    // --------------------------

    try {
await borrow.save();    

    res.send({
        success: true,
        message: "Book borrowed successfully",
        data: borrow
    });
    } catch (error) {
const borrow = new Borrow(req.body);
    const burrowInventory = await borrow.checkInventory(req.body.book);
    if(!burrowInventory) throw new Error(`Book not available`)
        res.send({
            success: false,
            message: "Book borrow un-successfull",
            error,
        });
    }

    // ---------------------------

    const borrow = new Borrow(req.body);
    const burrowInventory = await borrow.checkInventory(req.body.book);
    if(!burrowInventory) throw new Error(`Book not available`)

    // await borrow.save();    

    // res.send({
    //     success: true,
    //     message: "Book borrowed successfully",
    //     data: borrow
    // });
};

const getBorrows = async (req: Request, res: Response) => {
    const borrow = await Borrow.find();  // get all borrowed books v5-29:30

    res.send({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: borrow
    });
};

// try {
//         const bookId = req.params.bookId;
//         const data = await Book.findByIdAndDelete(bookId);
//         res.send({
//             success: true,
//             message: "Book deleted successfully",
//             data: null,
//         });
//     } catch (error) {
//         res.send({
//             success: false,
//             message: "Book deleted un-successfull",
//             error,
//         });
//     }


export const borrowController = {
    createBorrow,
    getBorrows
}