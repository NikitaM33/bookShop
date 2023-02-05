import { BookCard } from "./";

class Books {
  private cards: BookCard[] = [
    new BookCard(),
    new BookCard(),
    new BookCard(),
    new BookCard(),
  ];

  render() {
    return `
        Array of books <br />
        ${this.cards.map((card: BookCard) => card.render()).join('')}
        <div>
            <button>Load more</button>
        </div>
    `;
  }
}

export default Books;
