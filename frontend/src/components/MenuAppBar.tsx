import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';


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
        <Typography variant="h6"  sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }} component={Link}
            to="/loanHistory">
          {t("loanHistory")}
        </Typography>
        <IconButton
          size="large"
          color="inherit"
          aria-label="account"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => {navigate("/home")}}
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
