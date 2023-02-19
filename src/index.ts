import "./index.html";
import "./styles/style.scss";
import "./components/bannerSlider";
import { FETCH_BOOKS } from "./constants";
import { Request } from "../config";
import { Books } from "./components";
import { Store } from "./Store/AppStore";

const catalogCards: Element | null = document.querySelector(".catalog__cards");

const req = new Request();

req.fetchBooks(FETCH_BOOKS);

class App {
  private books = new Books();

  render() {
    return `
      <div>
        <h1>
          ${this.books.render()}
        </h1>
      </div>
    `;
  }
}

const app = new App();

if (catalogCards != undefined) {
  catalogCards.innerHTML = app.render();
}

Store.$render.subscribe(() => {
  if (catalogCards != undefined) {
    catalogCards.innerHTML = app.render();
  }
})
