import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuAppBar from './MenuAppBar';

interface Loan {
  loanId: number;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: string;
}

const LoanHistory = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const {t, i18n} = useTranslation()
  

  useEffect(() => {
    fetch(`http://localhost:8080/loan/getAll?userId=${localStorage.getItem("userId")}`)
      .then(response => response.json())
      .then(data => setLoans(data));
      console.log(localStorage.getItem("userId"))
  }, []);

  return (
    <>
    <MenuAppBar/>
    <TableContainer component={Paper} style={{ margin: '20px auto', padding: '20px', width: '80%' }}>
      <Typography variant="h4" gutterBottom>{t("loanHistory")}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Loan ID</TableCell>
            <TableCell>Borrow Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.loanId}>
              <TableCell>{loan.loanId}</TableCell>
              <TableCell>{loan.borrowDate}</TableCell>
              <TableCell>{loan.dueDate}</TableCell>
              <TableCell>{loan.returnDate || 'Not Returned'}</TableCell>
              <TableCell>{loan.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    
  );
};

export default LoanHistory;