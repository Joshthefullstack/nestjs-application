import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }



  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  // async createBook(title: string, author: string, price: number) {
  //   const newBook = new this.bookModel({
  //     title,
  //     author,
  //     price
  //   })

  //   const result = await newBook.save();
  // }

  async create(createBookDto: any): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async update(id: string, updateBookDto: any): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}
