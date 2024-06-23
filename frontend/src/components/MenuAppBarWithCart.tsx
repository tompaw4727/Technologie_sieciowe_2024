import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardModal from './CardModal';

interface MenuAppBarWithCartProps {
  books: number[];
  setBooksInCart: (
    books: number[] | ((prevBooksInCart: number[]) => number[]),
  ) => void;
}

export default function MenuAppBarWithCart({
  books,
  setBooksInCart,
}: MenuAppBarWithCartProps) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleTranslactionIconButton = () => {
    const newLanguage = i18n.language === 'en' ? 'pl' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className="Navbar">
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
            component={Link}
            to="/loanHistory"
          >
            {t('loanHistory')}
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            aria-label="account"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {
              navigate('/home');
            }}
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Box>
            <IconButton
              size="large"
              color="inherit"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleTranslactionIconButton}
              sx={{ mr: 2 }}
            >
              <GTranslateIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {
                navigate('/login');
              }}
              sx={{ mr: 2 }}
            >
              <AccountCircle />
            </IconButton>

            <IconButton
              size="large"
              color="inherit"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpen}
            >
              <ShoppingBagIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <CardModal
        open={open}
        handleClose={handleClose}
        books={books}
        updateBooksInCart={setBooksInCart}
      />
    </>
  );
}
