import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import BooksList from './components/BooksList';
import LoanList from './components/LoanList';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />}>
        <Route path="1" element={<h1>Route 1</h1>} />
        <Route path="2" element={<h1>Route 2 </h1>} />
      </Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/books" element={<BooksList />} />
      <Route path="/loans" element={<LoanList />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
