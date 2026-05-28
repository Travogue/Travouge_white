import { useEffect, useState } from 'react';
import { Typography, Grid, CircularProgress, Alert, Box, Button, Stack } from '@mui/material';
import PackageCard from '../components/PackageCard.jsx';
import { fetchPackages } from '../api.js';
import logo from '../assets/travouge-logo.svg';

function HomePage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPackages() {
      try {
        const result = await fetchPackages();
        setPackages(result);
      } catch (err) {
        setError('Unable to load travel packages.');
      } finally {
        setLoading(false);
      }
    }

    loadPackages();
  }, []);

  return (
    <div>
      <Box
        sx={{
          mb: 5,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(8,25,45,0.96), rgba(215,38,61,0.96))',
          color: '#fff',
          boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box component="img" src={logo} alt="Travouge logo" sx={{ height: 72, width: 'auto' }} />
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                Discover the world with Travouge
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, maxWidth: 520 }}>
                Book stunning travel packages, manage offers with the admin dashboard, and explore unforgettable destinations.
              </Typography>
            </Box>
          </Box>
          <Button variant="contained" color="secondary" size="large" href="#packages">
            Explore Packages
          </Button>
        </Stack>
      </Box>

      <Typography variant="h4" gutterBottom>
        Featured Travel Packages
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Browse our latest curated vacation packages and explore unique destinations.
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3} id="packages">
          {packages.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
              <PackageCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default HomePage;
