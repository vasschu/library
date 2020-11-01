import BooksService from '../data/booksData.js'

export const useBorrowBook = (id) => {
    return BooksService.borrowBook(id)
}