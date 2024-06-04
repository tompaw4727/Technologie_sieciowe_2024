import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import BooksList from './components/BooksList';
import LoanList from './components/LoanList';
import {I18nextProvider} from 'react-i18next';
import i18n from './locales/i18n';
import UserForm from './components/UserForm';
import BookForm from './components/BookForm';


function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/loans" element={<LoanList />} />
          <Route path="/addReader" element={<UserForm />} />
          <Route path="/addBook" element={<BookForm />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
