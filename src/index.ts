import "./index.html";
import "./styles/style.scss";
import "./components/bannerSlider";
import {
    Request
} from "../config";
import {
    Books
} from "./components";


const catalogCards: Element | null = document.querySelector('.catalog__cards');

const url: string =
  "https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyBqmGVzevB-Vt7uNYuutZAiC9VB5K2ofAg";
const req = new Request();

req.fetchBooks(url);

class App {
  private books = new Books();

  render() {
    return `
        <div>
            <h1>
                ${this.books.render()}
            </h1>
        </div>
    `
  }
}

const app = new App();

if (catalogCards != undefined) {
    catalogCards.innerHTML = app.render();
}




// const booksArr = fetchBooks(url);

// booksArr.forEach(book => {
//     console.log(book)
// });
