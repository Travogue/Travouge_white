import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  FormHelperText,
} from '@mui/material';

function PackageForm({ initialData, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [location, setLocation] = useState(initialData?.location ?? '');
  const [price, setPrice] = useState(initialData?.price?.toString() ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!title || !location || !price || !description || (!initialData && !image)) {
      setError('Please fill all fields and choose an image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      setSubmitting(true);
      await onSubmit(formData);
      setImage(null);
    } catch (submitError) {
      const message = submitError?.response?.data?.message;
      setError(message || 'Cannot save package. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#fff' }}>
      <Typography variant="h6" gutterBottom>
        {submitLabel}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Title"
            value={title}
            fullWidth
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Location"
            value={location}
            fullWidth
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Price"
            type="number"
            value={price}
            fullWidth
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            fullWidth
            multiline
            rows={5}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="package-image">Package image</InputLabel>
          <input id="package-image" type="file" accept="image/*" onChange={handleImageChange} />
          <FormHelperText>{initialData ? 'Leave blank to keep existing image.' : 'Upload a photo for the package.'}</FormHelperText>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Saving...' : submitLabel}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PackageForm;
