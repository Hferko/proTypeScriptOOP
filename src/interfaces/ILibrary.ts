import IBook from "./IBook";

export default interface ILibrary {
  books: IBook[];  

  addBook(book: IBook): void
  removeBook(id: string): void;
  findBookById(id: string): IBook|string;
  listAllBooks(): void;
  bookSelector(): void;
}
