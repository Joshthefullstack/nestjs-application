import  { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './books.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Books', schema: BookSchema}])],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [MongooseModule.forFeature([{name: 'Books', schema: BookSchema}])]
})

export class BooksModule {}