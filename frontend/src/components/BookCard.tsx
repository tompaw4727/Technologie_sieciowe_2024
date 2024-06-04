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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import MenuAppBar from './MenuAppBar';
import { useTranslation } from 'react-i18next';

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

function BookCard({ book, addToCart }: { book: Book; addToCart: (id: number) => void }) {
  const [expandedSummary, setExpandedSummary] = useState(false);
  const [expandedMoreInfo, setExpandedMoreInfo] = useState(false);
  const {t, i18n} = useTranslation()



  const handleExpandSummaryClick = () => {
    setExpandedSummary(!expandedSummary);
  };

  const handleExpandMoreInfoClick = () => {
    setExpandedMoreInfo(!expandedMoreInfo);
  };

  const handleAddToCartClick = () => {
    addToCart(book.id);
  }


  return (
    <Box
      className="Book-card"
      sx={{ maxWidth: 400, width: '100%', borderRadius: '1.5rem' }}
    >
      
      <Card sx={{ borderRadius: '1.5rem', border: '2px solid #e2dfdd' }}>
        <CardMedia sx={{ height: 400 }} image={book.coverImageUrl} title={book.title} />
        <CardContent className="Card-content" sx={{ py: 1 }}>
          <Typography gutterBottom variant="h4" component="div">
            {book.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {book.author}
          </Typography>
          <Rating
            name="read-only"
            value={book.score}
            readOnly
            sx={{ mt: 0, ml: 0 }}
            size="large"
          />
          <Typography variant="body2">{t("score")}: {book.score} </Typography>
        </CardContent>
        <CardContent className="Card-content" sx={{ py: "0.5rem" }}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="body1" color="text.secondary">
                {t("summary")}
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
          <CardContent className="Card-content" sx={{ padding: '0.25rem 1rem 0.25rem' }}>
            <Typography paragraph sx={{mb: "0rem"}}>{book.summary}</Typography>
          </CardContent>
        </Collapse>
        <CardContent className="Card-content" sx={{ py: 0 }}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="body1" color="text.secondary">
                {t("moreInfo")}
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
          <CardContent className="Card-content" sx={{ padding: '0.25rem 1rem' }}>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t("type")}:</span> {book.type}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t("publishYear")}:</span>{' '}
              {book.publishYear}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t("publisher")}:</span>{' '}
              {book.publisher}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t("isbn")}:</span> {book.isbn}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t("availableCopies")}:</span>{' '}
              {book.availableCopies}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions className="Card-content" sx={{ justifyContent: 'center' }}>
          <Button className="Normal-button" size="large" onClick={handleAddToCartClick}>
          {t("addToCart")}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default BookCard;
