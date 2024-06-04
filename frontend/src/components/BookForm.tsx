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
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik, FormikHelpers } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

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

interface BookDetailFormValues {}

function BookForm() {
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (values: BookFormValues, formik: FormikHelpers<BookFormValues>) => {
      console.log('Submitted values:', values);
      const jsonData = JSON.stringify(values);
      console.log('Request body:', jsonData);

      fetch('http://localhost:8080/book/addBookWithDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Login failed');
          }
        })
        .then((token) => {
          localStorage.setItem('token', token);
          navigate('/home');
        })
        .catch((error) => {
          alert('Wrong login or password');
        });
    },
    [navigate],
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
          initialValues={{
            isbn: '',
            title: '',
            author: '',
            publisher: '',
            publishYear: 0,
            availableCopies: 0,
            type: '',
            coverImageUrl: '',
            summary: '',
          }}
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
                <TextField
                  id="isbn"
                  label="Isbn"
                  variant="standard"
                  name="isbn"
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
                  Add Book
                </Button>
              </form>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default BookForm;
