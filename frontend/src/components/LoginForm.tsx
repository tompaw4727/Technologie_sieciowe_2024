import '../App.css';
import { TextField, Button, Box, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik, FormikHelpers } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import loginImage from '../resources/login-background.jpg';

interface LoginFormValues {
  login: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (values: LoginFormValues, formik: FormikHelpers<LoginFormValues>) => {
      const jsonData = JSON.stringify(values);
      console.log('Request body:', jsonData);
      fetch('http://localhost:8080/login', {
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
          // Store the token, for example in localStorage
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
        login: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(5, 'Password too short'),
      }),
    [],
  );

  return (
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
        initialValues={{ login: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik: any) => (
          <Box
            sx={{
              backgroundColor: '#faf0e8;',
              padding: '6rem',
              borderRadius: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'auto',
              marginTop: "2rem",
              marginBottom: "2rem"
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ marginBottom: '2rem', color: '#93551d' }}
            >
              Welcome to BookWorm!
            </Typography>
            <form
              action=""
              className="Login-form"
              id="signForm"
              onSubmit={formik.handleSubmit}
              style={{ width: '100%' }}
            >
              <TextField
                id="login"
                label="Username"
                variant="standard"
                name="login"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
                fullWidth
                sx={{ marginBottom: '1rem' }}
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
                SIGN IN
              </Button>
            </form>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default LoginForm;
