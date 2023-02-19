import { FetchBooks } from "../interfaces/FetchBooksInt";

class BookCard {
  constructor(private card: FetchBooks) {}


  render() {
  console.log('BOOK CARDS: CARD', this.card)

  return `
        <div class="cards__item">
            <div class="cards__img">
                ${this.card.volumeInfo.imageLinks ? `<img src=${this.card.volumeInfo.imageLinks.thumbnail} alt="Book name" />` : 'No image'}
            </div>

            <div class="cards__info">
                <div class="cards__descr descr">
                    ${this.card.volumeInfo.authors.map((author) => {
                        return (
                            `<span class="descr__author">${author}</span>`
                        )
                    })}
                    
                    
                    <h3 class="descr__name">${this.card.volumeInfo.title}</h3>

                    <div class="descr__annotation">
                        the outrageously funny debut novel about three super-rich,
                        pedigreed Chinese families and the gossip...
                    </div>

                    <div class="descr__price">
                        ${this.card.saleInfo.isEbook ? `$${this.card.saleInfo.listPrice?.amount}` : 'Sold'}
                    </div>
                </div>
                <div class="cards__buyBtn">
                    <button>Buy now</button>
                </div>
            </div>
        </div>
        `;
  }
}

export default BookCard;
