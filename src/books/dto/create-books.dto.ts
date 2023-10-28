import { IsInt, MinLength } from "class-validator";

export class CreateBooksDto {
  @MinLength(3)
  author: string;

  @MinLength(3)
  title: string;

  @IsInt()
  bookId: number;
}