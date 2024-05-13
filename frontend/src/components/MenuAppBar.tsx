import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const navigate = useNavigate();
  return (
    <AppBar>
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
          Library
        </Typography>
        <Box>
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
  );
}
