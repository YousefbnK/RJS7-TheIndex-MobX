import React, { Component } from "react";
import { observer } from "mobx-react";

// Stores
import authorStore from "./stores/authorStore";
import bookStore from "./stores/bookStore";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";

class AuthorDetail extends Component {
  // componentDidUpdate(prevProps) {
  //   if (prevProps.match.params.authorID !== this.props.match.params.authorID) {
  //     // this.getAuthor();
  //   }
  // }

  // getAuthor = async () => {
  // const authorID = this.props.match.params.authorID;
  // this.setState({ loading: true });
  // try {
  //   const res = await instance.get(`/api/authors/${authorID}`);
  //   const author = res.data;
  //   this.setState({ author: author, loading: false });
  // } catch (err) {
  //   console.error(err);
  // }
  // };

  render() {
    const author = authorStore.getAuthorById(this.props.match.params.authorID);
    console.log("Whaaaa", author.books);

    const bookById = author.books.map(bookID => bookStore.getBookById(bookID));

    console.log("Books", bookById);

    const authorName = `${author.first_name} ${author.last_name}`;
    return (
      <div className="author">
        <div>
          <h3>{authorName}</h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail img-fluid"
            alt={authorName}
          />
        </div>
        <BookTable books={bookById} />
      </div>
    );
  }
}

export default observer(AuthorDetail);
