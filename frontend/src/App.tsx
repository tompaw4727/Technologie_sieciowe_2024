import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import BooksList from './components/BooksList';
import LoanList from './components/LoanList';
import {I18nextProvider} from 'react-i18next';
import i18n from './locales/i18n';
import UserForm from './components/UserForm';
import BookForm from './components/BookForm';
import BookEditForm from './components/BookEditForm';
import LoanHistory from './components/LoanHistory';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewsList';
import UserList from './components/UserList';
import UserEditForm from './components/UserEditForm';
import NotFoundPage from './components/NotFountPage';


function App() {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
    return (
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Routes>
            <Route path="/home" element={token? <HomePage />: <Navigate to="/login" /> } />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/books" element={token? <BooksList />: <Navigate to="/login" /> } />
            <Route path="/loans" element={token? <LoanList />: <Navigate to="/home" /> } />
            <Route path="/addReader" element={userRole=="ROLE_EMPLOYEE"? <UserForm />: <Navigate to="/home" /> } />
            <Route path="/addBook" element={userRole=="ROLE_EMPLOYEE"? <BookForm />: <Navigate to="/home" /> } />
            <Route path="/editBook/:isbn" element={userRole=="ROLE_EMPLOYEE"? <BookEditForm />: <Navigate to="/home" /> } />
            <Route path="/editUser/:userId" element={userRole=="ROLE_EMPLOYEE"? <UserEditForm />: <Navigate to="/home" /> } />
            <Route path="/loanHistory" element={token? <LoanHistory />: <Navigate to="/login" /> } />
            <Route path="/userList" element={userRole=="ROLE_EMPLOYEE"? <UserList/>: <Navigate to="/home" /> } />
            <Route path="/addReview/:bookId" element={token? <ReviewForm/>: <Navigate to="/login" /> } />
            <Route path="/showReviews/:bookId" element={token? <ReviewList/>: <Navigate to="/login" /> } />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </I18nextProvider>
      </BrowserRouter>
    );  
  
}

export default App;
