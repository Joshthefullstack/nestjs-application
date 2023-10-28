import { Controller, Delete, Get, Param, Post, Put, Body, ParseIntPipe, ValidationPipe, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.model';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService){}

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookService.remove(id).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }
}
