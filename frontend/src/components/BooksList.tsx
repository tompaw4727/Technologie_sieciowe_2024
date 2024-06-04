import { Box, IconButton } from '@mui/material';
import '../App.css';
import BookCard from './BookCard';
import MenuAppBar from './MenuAppBar';
import React, {useEffect, useState} from 'react';
import MenuAppBarWithCart from './MenuAppBarWithCart';


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


  const handleAddToCart = (id: number) => {
    setBooksInCart(prevState => [...prevState, id]);
  };

  useEffect(() => {
    if (books) {
        fetch(`http://localhost:8080/book/getAllBoksInfo`)
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }
}, [books])


return (
  <Box>
    <MenuAppBarWithCart books={booksInCart} setBooksInCart = {setBooksInCart}/>
    <div className="Book-list">
      {books.map((book, index) => (
        <BookCard key={index} book={book} addToCart={handleAddToCart} />
      ))}
    </div>
  </Box>
);
}

export default BooksList;
