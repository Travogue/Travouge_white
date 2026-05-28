import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PackageDetailsPage from './pages/PackageDetailsPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import TravelDeskPage from './pages/TravelDeskPage.jsx';
import VisaServicesPage from './pages/VisaServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import logo from './assets/travouge-logo.svg';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('travouge_token');

  const handleLogout = () => {
    localStorage.removeItem('travouge_token');
    navigate('/login');
  };

  return (
    <Box>
      <AppBar position="static" color="primary" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1.5 }}>
            <Box component="img" src={logo} alt="Travouge logo" sx={{ height: 48, width: 'auto', display: 'block', mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff', fontWeight: 700 }}>
              Travouge
            </Typography>
            <Button component={NavLink} to="/" color="inherit">
              Home
            </Button>
            <Button component={NavLink} to="/about" color="inherit">
              About
            </Button>
            <Button component={NavLink} to="/services" color="inherit">
              Services
            </Button>
            <Button component={NavLink} to="/travel-desk" color="inherit">
              Travel Desk
            </Button>
            <Button component={NavLink} to="/visa-services" color="inherit">
              Visa Services
            </Button>
            <Button component={NavLink} to="/contact" color="inherit">
              Contact
            </Button>
            <Button component={NavLink} to="/admin" color="inherit">
              Admin
            </Button>
            {token ? (
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            ) : (
              <Button component={NavLink} to="/login" color="inherit">
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/travel-desk" element={<TravelDeskPage />} />
          <Route path="/visa-services" element={<VisaServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/packages/:id" element={<PackageDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Typography>Page not found.</Typography>} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
