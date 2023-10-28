import { Injectable } from '@nestjs/common';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './books.model';

@Injectable()
export class BooksService {
  private books = [
    {author: 'Rob Kiyoshi', title: 'Rich Dad, Poor Dad', bookId: 1},
    {author: 'Robert Kiyoshi', title: 'The Four Agreements', bookId: 2},
  ]

  constructor(@InjectModel('Books') private readonly bookModel: Model<Book>){}

  private findBook(bookId: number): [{author: string, title: string, bookId: number}, number] {
    const bookIndex = this.books.findIndex(book => book.bookId === +bookId);
    const book = this.books[bookIndex];
    return [book, bookIndex];
  }

  getBooks() {
    return this.books;
  }

  getBook(bookId: string) {
    return this.books.find(book => book.bookId === +bookId);
  }

  async createBook(title: string, author: string, price: number) {
    const newBook = new this.bookModel({
      title,
      author,
      price
    })

    const result = await newBook.save();
    console.log(result);
  }

  updateBook(updateBook: UpdateBooksDto) {
    const [book, index] = this.findBook(updateBook.bookId);
    this.books[index] = {
      ...book,
      ...updateBook,
    };
  }

  // mongodb+srv://IbiamJoshua:<password>@atlascluster.5kibqxo.mongodb.net/?retryWrites=true&w=majority

  deleteBook(bookId: number) {
    const [book, index] = this.findBook(bookId);
    this.books.splice(index, 1);
  }
}
