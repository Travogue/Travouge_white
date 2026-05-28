import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress, Alert, Paper, Chip } from '@mui/material';
import { fetchPackageById } from '../api.js';

function PackageDetailsPage() {
  const { id } = useParams();
  const [travelPackage, setTravelPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPackage() {
      if (!id) return;
      try {
        const result = await fetchPackageById(id);
        setTravelPackage(result);
      } catch (err) {
        setError('Package details could not be loaded.');
      } finally {
        setLoading(false);
      }
    }

    loadPackage();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!travelPackage) return <Typography>Package not found.</Typography>;

  return (
    <Paper sx={{ p: 3 }}>
      <Box component="img" src={travelPackage.imageUrl} alt={travelPackage.title} sx={{ width: '100%', maxHeight: 500, objectFit: 'cover', borderRadius: 2, mb: 3 }} />
      <Typography variant="h4" gutterBottom>
        {travelPackage.title}
      </Typography>
      <Chip label={travelPackage.location} sx={{ mb: 2 }} />
      <Typography variant="h6" color="primary" sx={{ mt: 2, mb: 2 }}>
        ${travelPackage.price.toFixed(2)}
      </Typography>
      <Typography variant="body1" paragraph>
        {travelPackage.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Updated {new Date(travelPackage.updatedAt ?? travelPackage.createdAt ?? '').toLocaleDateString()}
      </Typography>
    </Paper>
  );
}

export default PackageDetailsPage;
