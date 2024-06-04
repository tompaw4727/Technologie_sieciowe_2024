import { Box } from '@mui/material';
import '../App.css';
import LoanCard from './LoanCard';
import MenuAppBar from './MenuAppBar';
import React, {useEffect, useState} from 'react';

type Loan = {
  loanId: number;
  bookId: number,
  userId: number,
  borrowDate: string;
  dueDate: string;
  returnDate: string;
  status: string;
  
};

function LoanList() {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    if (loans) {
        fetch(`http://localhost:8080/loan/getAllLoansInfo`)
            .then(response => response.json())
            .then(data => setLoans(data))
            .catch(error => console.error('Error fetching loans: ', error));
    }
}, [loans])
  return (
    <Box>
      <MenuAppBar />
      <div className="Loan-list">
      {loans.map((loan, index) => (
        <LoanCard key={index} loan={loan} />
      ))}
    </div>
    </Box>
    
  );
}

export default LoanList;