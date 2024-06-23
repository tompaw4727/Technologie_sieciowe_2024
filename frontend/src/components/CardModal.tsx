import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions

} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CardModalProps {
  open: boolean;
  handleClose: () => void;
  books: number[];
  updateBooksInCart: (
    books: number[] | ((prevBooksInCart: number[]) => number[]),
  ) => void;
}

export default function CardModal({
  open,
  handleClose,
  books,
  updateBooksInCart,
}: CardModalProps) {
  const { t, i18n } = useTranslation();
  const [bookData, setBookData] = useState<{ id: number; title: string }[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchBookData();
  }, [books]);

  const fetchBookData = () => {
    Promise.all(
      books.map((bookId) =>
        fetch(`http://localhost:8080/book/getBookTitleById?bookId=${bookId}`)
          .then((response) => response.text())
          .then((title) => ({ id: bookId, title })),
      ),
    ).then((bookData) => setBookData(bookData));
  };

  const handleRemoveBook = (bookIdToRemove: number) => {
    setBookData((prevBookData) =>
      prevBookData.filter((book) => book.id !== bookIdToRemove),
    );
    updateBooksInCart((prevBooksInCart: number[]) =>
      prevBooksInCart.filter((id) => id !== bookIdToRemove),
    );
  };

  const userId = localStorage.getItem("userId");

  const handleCheckoutClick = () => {
    const bookIds = bookData.map((book) => book.id);
  
    fetch(`http://localhost:8080/loan/addMultipleLoans?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookIds),
    })
      .then((response) => {
        if (response.ok) {
          setDialogOpen(true);
          return response.text();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#faf0e8',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={2}
            sx={{ color: '#93551d' }}
          >
            {t('booksInCart')}
          </Typography>
          <List>
            {bookData.map((book, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`ID: ${book.id}`}
                  secondary={`Title: ${book.title}`}
                />
                <IconButton onClick={() => handleRemoveBook(book.id)}>
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button
            className="Normal-button"
            size="large"
            onClick={handleCheckoutClick}
          >
            {t('checkout')}
          </Button>
        </Box>
      </Modal>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('success')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {t('borrwoSuccess')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
