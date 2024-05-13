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
import { useState } from 'react';
import MenuAppBar from './MenuAppBar';

interface Book {
  img: string;
  title: string;
  author: string;
  summary: string;
  publisher: string;
  publishYear: number;
  type: string;
  isbn: string;
  rate: number;
  availableCopies: number;
}

function BookCard({ book }: { book: Book }) {
  const [expandedSummary, setExpandedSummary] = useState(false);
  const [expandedMoreInfo, setExpandedMoreInfo] = useState(false);

  const handleExpandSummaryClick = () => {
    setExpandedSummary(!expandedSummary);
  };

  const handleExpandMoreInfoClick = () => {
    setExpandedMoreInfo(!expandedMoreInfo);
  };

  return (
    <Box
      className="Book-card"
      sx={{ maxWidth: 400, width: '100%', borderRadius: '1.5rem' }}
    >
      <MenuAppBar />
      <Card sx={{ borderRadius: '1.5rem', border: '2px solid #e2dfdd' }}>
        <CardMedia sx={{ height: 400 }} image={book.img} title={book.title} />
        <CardContent className="Card-content" sx={{ py: 1 }}>
          <Typography gutterBottom variant="h4" component="div">
            {book.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {book.author}
          </Typography>
          <Rating
            name="read-only"
            value={book.rate}
            readOnly
            sx={{ mt: 0, ml: 0 }}
            size="large"
          />
        </CardContent>
        <CardContent className="Card-content" sx={{ py: "0.5rem" }}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="body1" color="text.secondary">
                Summary
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
                More info
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
              <span className="Info-description">Type:</span> {book.type}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">Publish Year:</span>{' '}
              {book.publishYear}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">Publisher:</span>{' '}
              {book.publisher}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">Isbn:</span> {book.isbn}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">Available copies:</span>{' '}
              {book.availableCopies}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions className="Card-content" sx={{ justifyContent: 'center' }}>
          <Button className="Normal-button" size="large">
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default BookCard;
