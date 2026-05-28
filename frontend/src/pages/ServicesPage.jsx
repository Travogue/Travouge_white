import { Typography, Container, Box, Grid, Card, CardContent, Button } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EventIcon from '@mui/icons-material/Event';

const ServicesPage = () => {
  const services = [
    {
      title: 'Flight Bookings',
      description: 'Book domestic and international flights with the best airlines at competitive prices.',
      icon: <FlightIcon sx={{ fontSize: 48, color: 'primary.main' }} />
    },
    {
      title: 'Hotel Reservations',
      description: 'Find and book accommodations ranging from budget hotels to luxury resorts worldwide.',
      icon: <HotelIcon sx={{ fontSize: 48, color: 'primary.main' }} />
    },
    {
      title: 'Car Rentals',
      description: 'Rent vehicles for your travel needs with flexible pickup and drop-off options.',
      icon: <DirectionsCarIcon sx={{ fontSize: 48, color: 'primary.main' }} />
    },
    {
      title: 'Tour Packages',
      description: 'Comprehensive travel packages including flights, hotels, and guided tours.',
      icon: <EventIcon sx={{ fontSize: 48, color: 'primary.main' }} />
    },
    {
      title: 'Restaurant Reservations',
      description: 'Book tables at popular restaurants and experience local cuisine.',
      icon: <RestaurantIcon sx={{ fontSize: 48, color: 'primary.main' }} />
    },
    {
      title: 'Photography Tours',
      description: 'Specialized tours for photography enthusiasts with professional guides.',
      icon: <CameraAltIcon sx={{ fontSize: 48, color: 'primary.main' }} />
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Our Services
        </Typography>

        <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
          Comprehensive travel solutions tailored to your needs
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom color="primary">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button variant="outlined" color="primary" fullWidth>
                    Learn More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Need Custom Services?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Contact our travel experts to create a personalized travel plan that matches your requirements and budget.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Get a Quote
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ServicesPage;
