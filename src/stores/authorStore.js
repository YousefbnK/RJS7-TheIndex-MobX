import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class AuthorStore {
  authors = [];

  loading = true;

  query = "";

  fetchAuthors = async () => {
    try {
      const res = await instance.get("/api/authors/");
      const authors = res.data;
      this.authors = authors;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };

  get filteredAuthors() {
    return this.authors.filter(author =>
      `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(this.query.toLowerCase())
    );
  }

  getAuthorById = id => this.authors.find(author => +author.id === +id);
}

decorate(AuthorStore, {
  authors: observable,
  loading: observable,
  query: observable,
  filteredAuthors: computed
});

const authorStore = new AuthorStore();
// console.log(authorStore);
authorStore.fetchAuthors();

export default authorStore;
