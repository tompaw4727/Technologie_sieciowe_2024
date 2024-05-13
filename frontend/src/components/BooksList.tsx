import '../App.css';
import BookCard from './BookCard';
import { books } from './books';
function BooksList() {
  return (
    <div className="Book-list">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}

export default BooksList;
