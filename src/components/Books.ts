import { BookCard } from "./";
import BookModel from "../models/bookModel";
import { FetchBooks } from "../interfaces/FetchBooksInt";
import { Store } from "../Store/AppStore";

class Books {
  private loading = true;
  private error: Error | null = null;
  private cards: FetchBooks[] = [];
  private bookModel = new BookModel();

  constructor() {
    this.getBooks();
  }


  getBooks() {
    this.bookModel
      .getBooks()
      .then((books: any) => {
        console.log('BOOKS: THIS CARDS', books)

        this.cards = books.items;
      })
      .catch((error) => {
        this.error = error;
      })
      .finally(() => {
        this.loading = false;
        Store.$render.next(null)
      });
  }

  render() {
    return `
        Array of books <br />
        ${this.cards
          .map((card: FetchBooks) => new BookCard(card))
          .map((card: BookCard) => card.render())
          .join("")}
        ${this.loading ? "<h3>Loading...</h3>" : ""}
        ${this.error ? `<h3>${this.error.message}</h3>` : ""}
        <div>
            <button>Load more</button>
        </div>
    `;
  }
}

export default Books;
