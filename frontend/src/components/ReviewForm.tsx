import '../App.css';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik, FormikHelpers } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';


import loginImage from '../resources/login-background.jpg';

interface ReviewAddFormValues {
  comment: string;
  reviewDate: string;
  score: number;
  bookId: number | undefined | string;
  userId: number;
}

type Severity = 'success' | 'error' | 'info' | 'warning';

function ReviewForm() {
  const { bookId } = useParams(); 
  const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  const currentDate = new Date().toISOString().slice(0, 10);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    Severity | undefined
  >(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

 
  
  const initialValues: ReviewAddFormValues = {
    comment: '',
    reviewDate: currentDate,
    score: 0,
    bookId: bookId, 
    userId: userId ,
  };



 const onSubmit = useCallback(
  (
    values: ReviewAddFormValues,
    formik: FormikHelpers<ReviewAddFormValues>,
  ) => {
    const requestBody = {
      ...values,
      reviewDate: currentDate,
      bookId: values.bookId,
      userId: values.userId,
    };

    fetch('http://localhost:8080/review/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.json().then((error) => {
          throw new Error(error.message || "Invalid input, please try again");
        });
      }
    })
    .then((text) => {
      setSnackbarMessage('Review added successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    })
    .catch((error) => {
      setSnackbarMessage('Error: ' + error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    });
  },
  [currentDate, bookId, userId],
);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        score: yup.number().required('Score is required'),
        comment: yup.string().required('Comment is required'),
      }),
    []
  );

  return (
    <Box>
      <MenuAppBar />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${loginImage})`,
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
        >
          {(formik: any) => (
            <Box
              sx={{
                backgroundColor: '#faf0e8;',
                paddingX: '6rem',
                paddingY: '1rem',
                borderRadius: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 'auto',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              <form
                action=""
                className="User-form"
                id="signForm"
                onSubmit={formik.handleSubmit}
                style={{ width: '100%' }}
              >
                <Select
                  id="score"
                  name="score"
                  value={formik.values.score}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.score && Boolean(formik.errors.score)}
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                >
                  {[0, 1, 2, 3, 4, 5].map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  id="comment"
                  label="Comment"
                  variant="standard"
                  name="comment"
                  multiline
                  rows={6} // Ilość wierszy
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.comment && Boolean(formik.errors.comment)
                  }
                  helperText={formik.touched.comment && formik.errors.comment}
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <Button
                  className="Main-page-button"
                  variant="contained"
                  startIcon={<LoginIcon />}
                  type="submit"
                  form="signForm"
                  disabled={!formik.isValid && formik.dirty}
                  fullWidth
                >
                  Add Review
                </Button>
              </form>
            </Box>
          )}
        </Formik>
      </Box>
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
    </Box>
  );
}

export default ReviewForm;
