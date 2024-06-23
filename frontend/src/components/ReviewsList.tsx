import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuAppBar from './MenuAppBar';
import { useParams } from 'react-router-dom';

interface Review {
  score: number;
  comment: string;
  userId: number;
}

const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { t } = useTranslation();
  const { bookId } = useParams<{ bookId: string }>();

  useEffect(() => {
    fetch(`http://localhost:8080/review/getAll?bookId=${bookId}`)
      .then(response => response.json())
      .then(data => setReviews(data));
  }, [bookId]);

  return (
    <>
      <MenuAppBar />
      <TableContainer component={Paper} style={{ margin: '20px auto', padding: '20px', width: '80%' }}>
        <Typography variant="h4" gutterBottom>{t("reviews")}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Score</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>User ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review, index) => (
              <TableRow key={index}>
                <TableCell>{review.score}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{review.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReviewList;