import { nanoid } from "nanoid";
import IBook from "../interfaces/IBook";

export class Book implements IBook{
  public readonly id: string;
   _title: string;
   _author: string;
   _price: number;

  constructor(title: string, author: string, price: number) {
    this.id = nanoid();
    this._title = title;
    this._author = author;
    this._price = price;
  }

  // ** Getterek, setterek
  get bookId(): string {
    return this.id;
  }

  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {    
    if (newTitle && newTitle.length > 0 &&  /^[A-zéáőúűöüóíÉÁŐÚŰÖÜÓÍ ,.'-]+$/.test( newTitle)) {
      this._title = newTitle;
    } 
    else {
      console.error("Valóban mi is a könyv címe?");
    }
  }

  get author(): string {
    return this._author;
  }

  set author(newAuthor: string) {
    const proper = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(newAuthor);
    
    if (newAuthor && newAuthor.length > 0 && proper) {
      this._author = newAuthor;
    } else {
      console.error("Ezt a könyvet nem ő írta!");
    }
  }

  get price(): number {
    return this._price;
  }

  set price(newPrice: number) {
    if (newPrice > 0) {
      this._price = newPrice;
    } else {
      console.error("Az árat kéretik magyar forintban megadni");
    }
  }

  public printBookInfo(): void {
    console.log(
      `Id = ${this.id}, A könyv címe = ${this._title}, a könyv ára: ${this._price} HUF `
    );
  }
}
