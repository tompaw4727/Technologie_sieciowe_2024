import '../App.css';
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik, FormikHelpers } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import loginImage from '../resources/login-background.jpg';

function NotFoundPage() {
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
      <Typography variant="h3" color="textPrimary" align="center">
        404 Page Not Found
      </Typography>
    </Box>
  );
}

export default NotFoundPage;
