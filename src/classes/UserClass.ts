import { nanoid } from "nanoid";
import Library from "./LibraryClass";
import IBook from "../interfaces/IBook";

const library = new Library();
library.listAllBooks();

export default class User {
  public readonly id: string;
  private _name: string;
  private _email: string;
  public borrowedList: IBook[];

  constructor(name: string, email: string) {
    this.id = nanoid();
    this._name = name;
    this._email = email;
    this.borrowedList = [];
  }

  // *** Get - Set ---->
  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (
      newName &&
      newName.length > 0 &&
      /^[A-zéáőúűöüóíÉÁŐÚŰÖÜÓÍ ,.'-]+$/.test(newName)
    ) {
      this._name = newName;
    } 
    else {
      console.error("Nem ér a neved...");
    }
  }

  get email(): string {
    return this._email;
  }

  set email(newEmail: string) {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (newEmail && newEmail.length > 0 && regex.test(newEmail)) {
      this._email = newEmail;
    } 
    else {
      console.error("Helytelen email cím.");
    }
  }
  // <------eddig get-set

  borrowBook(bookId: string): void {
    const library = new Library();
    let searchedBook: IBook | string = library.findBookById(bookId);
    console.log(searchedBook);
    const borrowed = document.querySelector<HTMLUListElement>("#borrowed")!;
    borrowed!.innerHTML = "";

    if (typeof searchedBook === "object") {
      library.removeBook(bookId);
      this.borrowedList.push(searchedBook);

      this.borrowedList.map((item) => {
        const li: HTMLLIElement = document.createElement("li");
        li.innerText = ` Cím: ${item._title}, Szerző: ${item._author}, Ára: ${item._price} HUF`;
        borrowed!.appendChild(li);
      });

      library.listAllBooks();
    } 
    else {
      borrowed!.innerHTML = searchedBook;
    }
  }

  renderUser(): void {
    const user = document.getElementById("user") as HTMLDivElement;
    user.innerText = `Belépve mint: ${this.name}`; // Kiíratom a user nevét a DOM-ba
  }
}
