import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function MenuAppBar() {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation()

  const handleTranslactionIconButton = () => {
    const newLanguage = i18n.language === 'en' ? 'pl' : 'en';
    i18n.changeLanguage(newLanguage)
  }


  return (
    <>
    <AppBar position="sticky">
      <Toolbar className='Navbar'>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("library")}
        </Typography>
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
          onClick={() => {navigate("/login")}}
          sx={{ mr: 2 }}
        >
          <AccountCircle />
        </IconButton>
        
        </Box>
      </Toolbar>
    </AppBar>
    </>
  );
}
