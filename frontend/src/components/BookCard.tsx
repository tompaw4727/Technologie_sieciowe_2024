import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Rating,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

interface Book {
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
}

type Severity = 'success' | 'error' | 'info' | 'warning';

function BookCard({
  book,
  addToCart,
}: {
  book: Book;
  addToCart: (id: number) => void;
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<Severity | undefined>(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const [expandedSummary, setExpandedSummary] = useState(false);
  const [expandedMoreInfo, setExpandedMoreInfo] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleExpandSummaryClick = () => {
    setExpandedSummary(!expandedSummary);
  };

  const handleExpandMoreInfoClick = () => {
    setExpandedMoreInfo(!expandedMoreInfo);
  };

  const handleAddToCartClick = () => {
    addToCart(book.id);
    setSnackbarMessage('Book added to cart successfully');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:8080/book/delete?bookIsbn=${book.isbn}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Book deleted successfully');
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((text) => {
        console.log('Server response:', text);
        setSnackbarMessage('Book updated successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarMessage('Error: ' + error.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleEditClick = () => {
    navigate(`/editBook/${book.isbn}`);
  };

  return (
    <Box
      className="Book-card"
      sx={{ maxWidth: 400, width: '100%', borderRadius: '1.5rem' }}
    >
      <Card sx={{ borderRadius: '1.5rem', border: '2px solid #e2dfdd' }}>
        <CardMedia
          sx={{ height: 400 }}
          image={book.coverImageUrl}
          title={book.title}
        />
        <CardContent className="Card-content" sx={{ py: 1 }}>
          <Typography gutterBottom variant="h4" component="div">
            {book.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {book.author}
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Rating
                name="read-only"
                value={book.score}
                readOnly
                sx={{ mt: 0, ml: 0 }}
                size="large"
              />
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                component={Link}
                to={`/addReview/${book.id}`}
                sx={{
                  ml: 1,
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                {t('addReview')}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
            {t('score')}: {book.score}
          </Typography>
          <Typography
            component={Link}
            to={`/showReviews/${book.id}`}
            variant="body2"
            sx={{ml: 1,
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              margin: "0rem"}}
          >
            {t("reviews")}
          </Typography>
        </CardContent>
        <CardContent className="Card-content" sx={{ py: '0.5rem' }}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="body1" color="text.secondary">
                {t('summary')}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                size="small"
                onClick={handleExpandSummaryClick}
                aria-expanded={expandedSummary}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={expandedSummary} timeout="auto" unmountOnExit>
          <CardContent
            className="Card-content"
            sx={{ padding: '0.25rem 1rem 0.25rem' }}
          >
            <Typography paragraph sx={{ mb: '0rem' }}>
              {book.summary}
            </Typography>
          </CardContent>
        </Collapse>
        <CardContent className="Card-content" sx={{ py: 0 }}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="body1" color="text.secondary">
                {t('moreInfo')}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                size="small"
                onClick={handleExpandMoreInfoClick}
                aria-expanded={expandedMoreInfo}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={expandedMoreInfo} timeout="auto" unmountOnExit>
          <CardContent
            className="Card-content"
            sx={{ padding: '0.25rem 1rem' }}
          >
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t('type')}:</span> {book.type}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t('publishYear')}:</span>{' '}
              {book.publishYear}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t('publisher')}:</span>{' '}
              {book.publisher}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t('isbn')}:</span> {book.isbn}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t('availableCopies')}:</span>{' '}
              {book.availableCopies}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions className="Card-content" sx={{ justifyContent: 'center' }}>
          {localStorage.userRole === 'ROLE_USER' && (
            <Button
              className="Normal-button"
              size="large"
              onClick={handleAddToCartClick}
            >
              {t('addToCart')}
            </Button>
          )}
          {localStorage.userRole === 'ROLE_EMPLOYEE' && (
            <Button
              className="Normal-button"
              size="large"
              onClick={handleEditClick}
            >
              {t('edit')}
            </Button>
          )}
          {localStorage.userRole === 'ROLE_EMPLOYEE' && (
            <Button
              className="Normal-button"
              size="large"
              onClick={handleDeleteClick}
            >
              {t('delete')}
            </Button>
          )}
        </CardActions>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert  onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BookCard;
