import ILibrary from "../interfaces/ILibrary";
import IBook from "../interfaces/IBook";

export default class Library implements ILibrary {
  public books: IBook[];

  constructor() {
    
    const storedData = localStorage.getItem("konyvtar");

    if (storedData) {
      const konyvtar:IBook[] = JSON.parse(storedData);
      this.books = konyvtar;      
    } 
    else {
      this.books = [];
    }
  }
  // constructor() {
  //   this.books = konyvtar;
  // }

  addBook(book: IBook): void {
    this.books.push(book);
    localStorage.setItem('konyvtar', JSON.stringify(this.books));    
    this.listAllBooks();
    this.bookSelector();
  }

  removeBook(id: string): void {
    this.books = this.books.filter((konyv) => konyv.id !== id);
    localStorage.setItem('konyvtar', JSON.stringify(this.books));    
    this.listAllBooks();
    this.bookSelector();
  }

  findBookById(id: string): IBook | string {
    let wantedBook: IBook | undefined = this.books.find(
      (konyv) => konyv.id === id
    );

    if (wantedBook) {
      return wantedBook;
    } else {
      return "Nem található ilyen könyv";
    }
  }

  listAllBooks(): void {
    const lista = document.querySelector("#lista") as HTMLUListElement;

    if (this.books.length > 0) {
      // Render lista
      lista.innerHTML = "";

      this.books.map((konyv) => {
        const li: HTMLLIElement = document.createElement("li");
        li.innerText = ` Cím: ${konyv._title}, Szerző: ${konyv._author}, Ára: ${konyv._price} HUF`;
        lista.appendChild(li);
      });
    } else {
      lista.innerHTML = "A könyvtár üres";
    }
  }

  bookSelector(): void {
    const select = document.querySelector("#borrowBook") as HTMLSelectElement;

    if (this.books.length > 0) {
      // Render User
      select.innerHTML = "";
      const firstOpt: HTMLOptionElement = document.createElement("option");
      firstOpt.value = "";
      firstOpt.innerText = "- Válassz -";
      select.appendChild(firstOpt);

      this.books.map((konyv) => {
        const option: HTMLOptionElement = document.createElement("option");
        option.value = konyv.id;
        option.innerText = konyv._title;
        select.appendChild(option);
      });
    } else {
      select.innerHTML = "A könyvtár üres";
    }
  }
}
