import { Box, Button } from '@mui/material';
import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MenuAppBarWithCart from './MenuAppBarWithCart';
import BookCard from './BookCard';
import '../App.css';

type Book = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishYear: number;
  availableCopies: number;
  coverImageUrl: string;
  summary: string;
  score: number;
  type: string;
};

function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksInCart, setBooksInCart] = useState<number[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAddToCart = (id: number) => {
    setBooksInCart((prevState) => [...prevState, id]);
  };

  const handleAddBook = () => {
    navigate('/addBook');
  };

  useEffect(() => {
    if (books) {
      fetch(`http://localhost:8080/book/getAllBoksInfo`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error('Error fetching books:', error));
    }
  }, [books]);

  return (
    <Box>
      <MenuAppBarWithCart books={booksInCart} setBooksInCart={setBooksInCart} />
      <div className="Book-list">
        {books.map((book, index) => (
          <BookCard key={index} book={book} addToCart={handleAddToCart} />
        ))}
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
      >
        {localStorage.userRole === 'ROLE_EMPLOYEE' && (
          <Button
            className="Main-page-button"
            size="large"
            onClick={handleAddBook}
          >
            {t('addBook')}
          </Button>
        )}
      </div>
    </Box>
  );
}

export default BooksList;
