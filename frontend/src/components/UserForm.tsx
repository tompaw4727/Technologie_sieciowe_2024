import '../App.css';
import { TextField, Button, Box, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik, FormikHelpers } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import MenuAppBar from './MenuAppBar';

import loginImage from '../resources/login-background.jpg';

interface UserAddFormValues {
  username: string;
  password: string;
  role: string;
  fullName: string;
  userMail: string;
}

type Severity = 'success' | 'error' | 'info' | 'warning';

function UserForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    Severity | undefined
  >(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = useCallback(
    (values: UserAddFormValues, formik: FormikHelpers<UserAddFormValues>) => {
      
      fetch('http://localhost:8080/user/add', {
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
            return response.json().then((error) => {
              throw new Error(error.message || "Invalid input, please try again");
            });
          }
        })
        .then((text) => {
          setSnackbarMessage('User added successfully');
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
        username: yup.string().required('Required'),
        fullName: yup.string().required('Required'),
        userMail: yup.string().required('Required').email('Invalid email format'),
        role: yup.string().required('Required'),
        password: yup
        .string()
        .required('Required')
        .min(8, 'Password too short')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!_()\\-]).+$/,
          'Password not strong enough'
        ),
        
      }),
    [],
  );


  return (
    <Box>
      <MenuAppBar/>
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
        initialValues={{ username: '', password: '', role:"", fullName: "", userMail: ""}}
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
              marginTop: "2rem",
              marginBottom: "2rem"
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
                id="username"
                label="Username"
                variant="standard"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
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
              <TextField
                id="fullName"
                label="Full Name"
                variant="standard"
                name="fullName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                fullWidth
                sx={{ marginBottom: '1rem' }}
              />
              <TextField
                id="userMail"
                label="Mail"
                variant="standard"
                name="userMail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.userMail && Boolean(formik.errors.userMail)
                }
                helperText={formik.touched.userMail && formik.errors.userMail}
                fullWidth
                sx={{ marginBottom: '1rem' }}
              />
              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <InputLabel id="userRoleLabel">Role</InputLabel>
                <Select
                  labelId="userRoleLabel"
                  id="role"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.role && Boolean(formik.errors.role)
                  }
                  label="User Role"
                >
                  <MenuItem value="ROLE_USER">READER</MenuItem>
                  <MenuItem value="ROLE_EMPLOYEE">EMPLOYEE</MenuItem>
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
                Add User
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

export default UserForm;