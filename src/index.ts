import "./style.css";
import { Book } from "./classes/BookClass";
import Library from "./classes/LibraryClass";
import User from "./classes/UserClass";
import IBook from "./interfaces/IBook";


// Könyvek példányosítása
let konyv1 = new Book('A helység kalapácsa', 'Petőfi Sándor', 1300);
let konyv2 = new Book('Búcsú a fegyverektől', 'Ernest Hemingway', 2400);
let konyv3 = new Book('Úri muri', 'Móricz Zsigmond', 2357);
let konyv4 = new Book('A lét elviselhetetlen könnyűsége','Milan Kundera', 2868);
let konyv5 = new Book('Háború és béke', 'Lev Tolsztoj', 3757);
konyv1.printBookInfo();
konyv2.printBookInfo();
konyv3.printBookInfo();

// A könyvtár példányosítása, hogy hozzá tudjam adni a konyveket a listához
let library = new Library();
library.addBook(konyv1);
library.addBook(konyv2);
library.addBook(konyv3);
library.addBook(konyv4);
library.addBook(konyv5);

// Egy User létrehozása--
let ficko = new User("Glázser Bozsó", "www@qqq.yy");
const bookId = konyv1.bookId;
ficko.borrowBook(bookId); // Kölcsönöz egy könyvet
ficko.renderUser()


/////////////! \ *** D. O. M. *** - \ !///////////////

/////////     A  SELECT form ---->
library.bookSelector(); // Létrehozza a selector opcióit

const select: HTMLSelectElement = document.getElementById("borrowBook") as HTMLSelectElement;

select.addEventListener("change", (event) => {
  const value = (event.target as HTMLSelectElement).value;
  
  ficko.borrowBook(value);   // Elindítja a kölcsönzést a kiválasztott könyv alapján

  let lentBook: IBook | string = library.findBookById(value); 
  const alert2 = document.querySelector<HTMLUListElement>("#alert2")!;

  if (typeof lentBook === "object") {
    alert2.innerText = `Kikölcsönözted ${lentBook._author}-tól a ${lentBook._title} című könyvet`;
    alert2.style.display = "block";
  }
});

/////////////// Új könyv hozzáadó form --->
type FormBook = {
  title: string;
  author: string;
  price: number;
}

const t = document.getElementById("title") as HTMLInputElement;
const a = document.getElementById("author") as HTMLInputElement;
const p = document.getElementById("price") as HTMLInputElement;
const registerbtn: HTMLButtonElement = document.getElementById("registerbtn") as HTMLButtonElement;

registerbtn.addEventListener("click", (event) => {
  event.preventDefault();
  const formBook: FormBook = {
    title: t.value,
    author: a.value,
    price: +p.value,
  };
  const {title, author, price} = formBook;
  const alert = document.querySelector<HTMLUListElement>("#alert")!;

  if (title === '' || author === '' || price === 0) {
    alert.innerHTML = "Nem adtál meg minden adatot !!";
    alert.style.display = "block";
    return;
  }

  let ujKonyv = new Book(title, author, price);
  library.addBook(ujKonyv);
  
  alert.style.display = "block";
  alert.innerHTML = "Az új könyv felvéve a könyvtárba megtörtént.";

  t.value = "";
  a.value = "";
  p.value = "";
});

/////// -- Új felhasználó form --
type FormUser = {
  name: string;
  email: string;
}

const form = document.getElementById('userForm') as HTMLFormElement;
const n = (document.getElementById('name') as HTMLInputElement);
const e = (document.getElementById('email') as HTMLInputElement);
const message = (document.getElementById('message') as HTMLDivElement);

form.onsubmit = (event) => {
  event.preventDefault();
  const formUser: FormUser = {
    name: n.value,
    email: e.value,
  };

  if (!/^[A-zéáőúűöüóíÉÁŐÚŰÖÜÓÍ ,.'-]+$/.test(formUser.name)) {
    message.style.display = "block";
    message.innerText = 'Érvénytelen név megadása !!!!';
    return;
  }  
  const tag = new User(formUser.name, formUser.email);
  tag.renderUser();

  message.style.display = "block";
  message.innerText = `Új Felhasználó Név: ${formUser.name} email: ${formUser.email}`;
  n.value = "";
  e.value = "";
};
