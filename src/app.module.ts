import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { PostModule } from './post/post.module';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [PostModule, MongooseModule.forRoot('mongodb+srv://IbiamJoshua:blessing@atlascluster.5kibqxo.mongodb.net/?retryWrites=true&w=majority'), BooksModule],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService, BooksModule],
})
export class AppModule {}
