import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, Paper } from '@mui/material';
import { loginUser } from '../api.js';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser({ email, password });
      localStorage.setItem('travouge_token', result.token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 480, mx: 'auto', p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Admin Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Email"
          type="email"
          value={email}
          fullWidth
          margin="normal"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          fullWidth
          margin="normal"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
          {loading ? 'Signing in...' : 'Login'}
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginPage;
