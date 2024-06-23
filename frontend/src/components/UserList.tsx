import  { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuAppBar from './MenuAppBar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface User {
  userId: number;
  fullName: string;
  password: string;
  role: string;
  userMail: string;
  username: string;
}
type Severity = 'success' | 'error' | 'info' | 'warning';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    Severity | undefined
  >(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddUser = () => {
    navigate('/addReader');
  };

  useEffect(() => {
    fetch(`http://localhost:8080/user/getAll`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDeleteClick = (userId: number) => {
    fetch(`http://localhost:8080/user/delete?userId=${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('User deleted successfully');
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((text) => {
        setSnackbarMessage('User deleted Succesfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarMessage('Error: ' + error.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleUpdate = (userId: number) => {
    navigate(`/editUser/${userId}`);
  };

  return (
    <>
      <MenuAppBar />
      <TableContainer
        component={Paper}
        style={{ margin: '20px auto', padding: '20px', width: '80%' }}
      >
        <Typography variant="h4" gutterBottom>
          {t('users')}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>User Mail</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.userMail}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteClick(user.userId)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleUpdate(user.userId)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
      >
        <Button
          className="Main-page-button"
          size="large"
          onClick={handleAddUser}
        >
          {t('addUser')}
        </Button>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserList;
