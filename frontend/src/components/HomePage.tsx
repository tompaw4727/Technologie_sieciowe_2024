import { Box, Button } from '@mui/material';
import MenuAppBar from './MenuAppBar';
import { Link, Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <Button variant="contained" component={Link} to="1" sx={{ m: 10}}>
          Route 1
        </Button>
        <Button variant="contained" component={Link} to="2" sx={{ m: 10 }}>
          Route 2
        </Button>
      </Box>
      <Outlet />
    </Box>
    
  );
}

export default HomePage;
