import { nanoid } from "nanoid";
import IBook from "./interfaces/IBook";

const konyvtar: IBook[] = [
  {
    id: nanoid(),
    _title: 'A lét elviselhetetlen könnyűsége',
    _author: 'Milan Kundera',
    _price: 2340
  },
  {
    id: nanoid(),
    _title: 'Háború és béke',
    _author: 'Lev Tolsztoj',
    _price: 3697
  },
  {
    id: nanoid(),
    _title: 'Piszkos Fred a kapitány',
    _author: 'Rejtő Jenő',
    _price: 3562
  },  
];
localStorage.setItem('konyvtar', JSON.stringify(konyvtar));   
  
export default konyvtar;