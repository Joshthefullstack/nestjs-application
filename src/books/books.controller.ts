import { Controller, Delete, Get, Param, Post, Put, Body, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books-dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService){}

  @Get()
  getBooks() {
    return this.bookService.getBooks();
  }

  @Post()
  async createBook(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('price') price: number
  ){
    const generatedId = await this.bookService.createBook(
      title,
      author,
      price
    )
    return { id: generatedId }
  }

  @Get(':bookId')
  getBook(@Param('bookId') bookId: string) {
    return this.bookService.getBook(bookId)
  }

  @Put(':bookId')
  updateBook(@Param(':bookId') bookId: string, @Body() UpdateBooksDto: UpdateBooksDto) {
    return this.bookService.updateBook(UpdateBooksDto)
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.bookService.deleteBook(bookId);
  }
}
