import '../App.css';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik, FormikHelpers } from 'formik';
import { useCallback, useMemo, useState, useEffect } from 'react';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

import loginImage from '../resources/login-background.jpg';
import MenuAppBar from './MenuAppBar';

interface BookFormValues {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishYear: number;
  availableCopies: number;
  type: string;
  coverImageUrl: string;
  summary: string;
}
type Severity = 'success' | 'error' | 'info' | 'warning';

function BookEditForm() {
  const { isbn } = useParams();
  const [initialValues, setInitialValues] = useState<BookFormValues>({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publishYear: 0,
    availableCopies: 0,
    type: '',
    coverImageUrl: '',
    summary: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<Severity | undefined>(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/book/getBookInfosByIsbn?isbn=${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        setInitialValues({
          isbn: data.isbn,
          title: data.title,
          author: data.author,
          publisher: data.publisher,
          publishYear: data.publishYear,
          availableCopies: data.availableCopies,
          type: data.type,
          coverImageUrl: data.coverImageUrl,
          summary: data.summary,
        });
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }, [isbn]);


  const onSubmit = useCallback(
    (values: BookFormValues, formik: FormikHelpers<BookFormValues>) => {
      const jsonData = JSON.stringify(values);

      fetch('http://localhost:8080/book/updateBookWithDetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            return response.json().then((error) => {
              console.error('Server error:', error);
              throw new Error(error.message || 'Invalid input, please try again');
            });
          }
        })
        .then((text) => {
          console.log('Server response:', text);
          setSnackbarMessage('Book updated successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        })
        .catch((error) => {
          setSnackbarMessage('Error: ' + error.message);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    },
    [],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        isbn: yup.string().required('Required'),
        title: yup.string().required('Required'),
        author: yup.string().required('Required'),
        publisher: yup.string().required('Required'),
        publishYear: yup.string().required('Required'),
        availableCopies: yup.string().required('Required'),
        type: yup.string().required('Required'),
        coverImageUrl: yup.string().required('Required'),
        summary: yup.string().required('Required'),
      }),
    [],
  );
  console.log(initialValues.isbn);
  console.log(initialValues.type);
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
          enableReinitialize
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
                <TextField
                  id="isbn"
                  label="Isbn"
                  variant="standard"
                  name="isbn"
                  value={formik.values.isbn}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.isbn && Boolean(formik.errors.isbn)}
                  helperText={formik.touched.isbn && formik.errors.isbn}
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  id="title"
                  label="Title"
                  variant="standard"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  id="author"
                  label="Author"
                  variant="standard"
                  name="author"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.author && Boolean(formik.errors.author)}
                  helperText={formik.touched.author && formik.errors.author}
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  id="publisher"
                  label="Publisher"
                  variant="standard"
                  name="publisher"
                  value={formik.values.publisher}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.publisher && Boolean(formik.errors.publisher)
                  }
                  helperText={
                    formik.touched.publisher && formik.errors.publisher
                  }
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  id="publishYear"
                  label="Publish Year"
                  variant="standard"
                  name="publishYear"
                  value={formik.values.publishYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.publishYear &&
                    Boolean(formik.errors.publishYear)
                  }
                  helperText={
                    formik.touched.publishYear && formik.errors.publishYear
                  }
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  id="availableCopies"
                  label="Available Copies"
                  variant="standard"
                  name="availableCopies"
                  value={formik.values.availableCopies}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.availableCopies &&
                    Boolean(formik.errors.availableCopies)
                  }
                  helperText={
                    formik.touched.availableCopies &&
                    formik.errors.availableCopies
                  }
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  id="coverImageUrl"
                  label="Cover Image Url"
                  variant="standard"
                  name="coverImageUrl"
                  value={formik.values.coverImageUrl}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.coverImageUrl &&
                    Boolean(formik.errors.coverImageUrl)
                  }
                  helperText={
                    formik.touched.coverImageUrl && formik.errors.coverImageUrl
                  }
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  id="summary"
                  label="Summary"
                  variant="standard"
                  name="summary"
                  value={formik.values.summary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.summary && Boolean(formik.errors.summary)
                  }
                  helperText={formik.touched.summary && formik.errors.summary}
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                  <InputLabel id="type">Type</InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    label="Type"
                  >
                    <MenuItem value="FICTION">Fiction</MenuItem>
                    <MenuItem value="NON_FICTION">Non-fiction</MenuItem>
                    <MenuItem value="MYSTERY">Mystery</MenuItem>
                    <MenuItem value="SCIENCE_FICTION">Science Fiction</MenuItem>
                    <MenuItem value="FANTASY">Fantasy</MenuItem>
                    <MenuItem value="BIOGRAPHY">Biography</MenuItem>
                    <MenuItem value="HISTORY">History</MenuItem>
                    <MenuItem value="POETRY">Poetry</MenuItem>
                    <MenuItem value="DRAMA">Drama</MenuItem>
                    <MenuItem value="SELF_HELP">Self-help</MenuItem>
                    <MenuItem value="REFERENCE">Reference</MenuItem>
                    <MenuItem value="TRAVEL">Travel</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  className="Main-page-button"
                  variant="contained"
                  startIcon={<LoginIcon />}
                  type="submit"
                  form="signForm"
                  disabled={!formik.isValid && formik.dirty}
                  fullWidth
                >
                  Edit Book
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
        <Alert  onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BookEditForm;
