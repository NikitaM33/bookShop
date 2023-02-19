import { FETCH_BOOKS } from "../constants";
import { Request } from "../../config";

const request = new Request();

class BookModel {
  static isExist: boolean = false;
  static instance: BookModel;

  constructor() {
    if (BookModel.isExist) {
      return BookModel.instance;
    }

    BookModel.isExist = true;
    BookModel.instance = this;
  }

  getBooks() {
    return request.fetchBooks(FETCH_BOOKS);
  }
}

export default BookModel;
