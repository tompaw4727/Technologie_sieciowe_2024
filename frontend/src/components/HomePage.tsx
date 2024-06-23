import { Box, Button, Grid, Typography } from '@mui/material';
import MenuAppBar from './MenuAppBar';
import homImage from '../resources/home-image.jpg';
import { useTranslation } from 'react-i18next';
import { useNavigate} from 'react-router-dom';

function HomePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  const handleLibraryCollection = () => {
    navigate("/books")
  }
  const handleLoans = () => {
    navigate("/loans")
  }
  const handleUsers = () => {
    navigate("/userList")
  }

  return (
    <>
      <MenuAppBar />
      <Box
        sx={{
          padding: '5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1000px' }}>
          <Grid container spacing={2} className="Grid-container">
            <Grid item xs={6}>
              <img
                src={homImage}
                alt="Home"
                style={{ width: '100%', height: 'auto', borderRadius: '1rem' }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h1"
                gutterBottom
                align="center"
                sx={{ color: '#93551d' }}
              >
                BookWorm
              </Typography>
              <Typography variant="h5" paragraph align="center">
                {t('homePageDescription')}
              </Typography>
              <Box className="button-box">
                <Button className="Main-page-button" size="large" onClick={handleLibraryCollection}>
                {t('liblaryCollection')}
                </Button>
                {localStorage.userRole === 'ROLE_EMPLOYEE' && (
                  <Button className="Main-page-button" size="large" onClick={handleLoans}>
                    {t('loans')}
                  </Button>
                )}
                {localStorage.userRole === 'ROLE_EMPLOYEE' && (
                  <Button className="Main-page-button" size="large" onClick={handleUsers}>
                    {t('users')}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
