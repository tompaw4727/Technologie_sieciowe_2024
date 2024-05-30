import { Box, Button, Grid, Typography } from '@mui/material';
import MenuAppBar from './MenuAppBar';
import homImage from '../resources/home-image.jpg';

function HomePage() {
  return (
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
          {/* Lewa strona: Zdjęcie biblioteki */}
          <Grid item xs={6}>
            <img
              src={homImage}
              alt="Home"
              style={{ width: '100%', height: 'auto', borderRadius:"1rem" }}
            />
          </Grid>

          {/* Prawa strona: Informacje tekstowe */}
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
              Explore the world of literature effortlessly with BookWorm.
              Borrow, discover, and manage books seamlessly. For readers, easy
              access to a vast digital collection; for librarians, efficient
              management tools. Your gateway to a world of books, simplified."
            </Typography>
            <Box className="button-box"
            >
              <Button className="Main-page-button" size="large">
                For Readers{' '}
              </Button>
              <Button className="Main-page-button" size="large">
                For Library Workers
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
