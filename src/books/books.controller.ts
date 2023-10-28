import { Controller, Delete, Get, Param, Post, Put, Body, ParseIntPipe, ValidationPipe, NotFoundException } from '@nestjs/common';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books-dto';
import { BooksService } from './books.service';
import { Book } from './books.model';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService){}

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  // @Post()
  // async createBook(
  //   @Body('title') title: string,
  //   @Body('author') author: string,
  //   @Body('price') price: number
  // ){
  //   const generatedId = await this.bookService.create(
  //     title,
  //     author,
  //     price
  //   )
  //   return { id: generatedId }
  // }

  @Post()
  create(@Body() createBookDto: any): Promise<Book> {
    return this.bookService.create(createBookDto);
  }


  @Get(':id')
 async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }

  @Put(':id')
 async update(@Param('id') id: string, @Body() updateBookDto: any): Promise<Book> {
    return this.bookService.update(id, updateBookDto).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }

  // @Delete(':bookId')
  // deleteBook(@Param('bookId', ParseIntPipe) bookId: number) {
  //   return this.bookService.remove(bookId);
  // }
}
