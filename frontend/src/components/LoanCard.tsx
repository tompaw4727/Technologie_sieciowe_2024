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
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkAddedSharpIcon from '@mui/icons-material/BookmarkAddedSharp';
import MenuAppBar from './MenuAppBar';
import { useTranslation } from 'react-i18next';
//Zdjecia pogladowe na pewno je zmienie
import ReturnedImage from '../resources/accept.png';
import ActiveImage from '../resources/time-left.png';

type Loan = {
  loanId: number;
  bookId: number;
  userId: number;
  borrowDate: string;
  dueDate: string;
  returnDate: string;
  status: string;
};

function LoanCard({ loan }: { loan: Loan }) {
  const [expandedMoreInfo, setExpandedMoreInfo] = useState(false);
  const statusImages: { [key: string]: string } = {
    Active: ActiveImage,
    Returned: ReturnedImage,
  };
  const [loanStatus, setLoanStatus] = useState<Loan['status']>(loan.status);
  const { t, i18n } = useTranslation();

  const handleExpandMoreInfoClick = () => {
    setExpandedMoreInfo(!expandedMoreInfo);
  };

  const handleChangeStatusClick = () => {
    fetch(`http://localhost:8080/loan/changeStatus?loanId=${loan.loanId}`, {
      method: 'PUT',
    })
      .then((response) => response.text())
      .then((data) => setLoanStatus(data))
      .catch((error) =>
        console.error('Error fetching possible causes:', error),
      );
  };

  return (
    <Box
      className="Book-card"
      sx={{ maxWidth: 250, width: '100%', borderRadius: '1.5rem' }}
    >
      <Card sx={{ borderRadius: '1.5rem', border: '2px solid #e2dfdd' }}>
        <CardMedia
          sx={{ height: 140 }}
          image={statusImages[loanStatus]}
          title=""
        />
        <CardContent className="Card-content" sx={{ py: 1 }}>
          <Typography gutterBottom variant="h4" component="div">
            {t('loan')} ID: {loan.loanId}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Status: {loanStatus}
          </Typography>
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
              <span className="Info-description">{t('book')} ID:</span>{' '}
              {loan.bookId}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t('reader')} ID:</span>{' '}
              {loan.userId}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t('borrowDate')}:</span>{' '}
              {loan.borrowDate}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t('dueDate')}:</span>{' '}
              {loan.dueDate}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">{t('returnDate')}:</span>{' '}
              {loan.returnDate}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions className="Card-content" sx={{ justifyContent: 'center' }}>
          <Button
            className="Normal-button"
            size="large"
            onClick={handleChangeStatusClick}
          >
            {t('changeStatus')}
          </Button>
          
        </CardActions>
      </Card>
    </Box>
  );
}

export default LoanCard;
