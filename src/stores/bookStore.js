import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  books = [];

  loading = true;

  query = "";

  avalaible = true;

  fetchBooks = async () => {
    try {
      const res = await instance.get("/api/books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };

  get filteredBooks() {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  filterBooksByColor = bookColor =>
    this.filteredBooks.filter(book => book.color === bookColor);

  getBookById = id => this.books.find(book => +book.id === +id);
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  available: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
