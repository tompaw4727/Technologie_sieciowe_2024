import '../App.css';
import LoanCard from './LoanCard';
import { loans } from './loans';

function LoanList() {
  return (
    <div className="Loan-list">
      {loans.map((loan, index) => (
        <LoanCard key={index} loan={loan} />
      ))}
    </div>
  );
}

export default LoanList;