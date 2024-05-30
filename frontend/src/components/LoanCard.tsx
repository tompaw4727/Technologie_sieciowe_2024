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
//Zdjecia pogladowe na pewno je zmienie
import ReturnedImage from '../resources/accept.png';
import ActiveImage from '../resources/time-left.png';

interface Loan {
  status: string;
  borrowDate: string;
  dueDate: string;
  bookId: number;
  userId: number;
  id: number;
}

function LoanCard({ loan }: { loan: Loan }) {
  const [expandedMoreInfo, setExpandedMoreInfo] = useState(false);
  const statusImages: { [key: string]: string } = {
    Active: ActiveImage,
    Returned: ReturnedImage,
  };
  const [loanStatus, setLoanStatus] = useState<Loan['status']>(loan.status);

  const handleExpandMoreInfoClick = () => {
    setExpandedMoreInfo(!expandedMoreInfo);
  };

  const handleChangeStatusClick = () => {
    const newStatus = loanStatus === 'Active' ? 'Returned' : 'Active';
    setLoanStatus(newStatus);
  };

  return (
    <Box
      className="Book-card"
      sx={{ maxWidth: 250, width: '100%', borderRadius: '1.5rem' }}
    >
      <MenuAppBar />
      <Card sx={{ borderRadius: '1.5rem', border: '2px solid #e2dfdd' }}>
        <CardMedia
          sx={{ height: 140 }}
          image={statusImages[loanStatus]}
          title=""
        />
        <CardContent className="Card-content" sx={{ py: 1 }}>
          <Typography gutterBottom variant="h4" component="div">
          Loan ID: {loan.id}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Status: {loanStatus}
          </Typography>
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
          <CardContent
            className="Card-content"
            sx={{ padding: '0.25rem 1rem' }}
          >
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">Book ID:</span> {loan.bookId}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">User ID:</span> {loan.userId}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">Borrow Date:</span>{' '}
              {loan.borrowDate}
            </Typography>
            <Typography paragraph sx={{ mb: '0.5rem' }}>
              <span className="Info-description">Due Date:</span> {loan.dueDate}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions className="Card-content" sx={{ justifyContent: 'center' }}>
          <Button
            className="Normal-button"
            size="large"
            onClick={handleChangeStatusClick}
          >
            Change status
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default LoanCard;
