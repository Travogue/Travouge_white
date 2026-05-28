import { Typography, Container, Box, Grid, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import SupportIcon from '@mui/icons-material/Support';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';

const TravelDeskPage = () => {
  const supportOptions = [
    {
      title: '24/7 Customer Support',
      description: 'Round-the-clock assistance for all your travel needs',
      icon: <SupportIcon color="primary" />,
      details: ['Emergency assistance', 'Booking modifications', 'Travel advice', 'Complaint resolution']
    },
    {
      title: 'Operating Hours',
      description: 'Our travel desk is available during business hours',
      icon: <ScheduleIcon color="primary" />,
      details: ['Monday - Friday: 9:00 AM - 8:00 PM', 'Saturday: 9:00 AM - 6:00 PM', 'Sunday: 10:00 AM - 4:00 PM', 'Emergency: 24/7']
    },
    {
      title: 'Contact Methods',
      description: 'Multiple ways to reach our travel experts',
      icon: <PhoneIcon color="primary" />,
      details: ['Phone: +1 (555) 123-4567', 'Email: support@travouge.com', 'Live Chat: Available 24/7', 'WhatsApp: +1 (555) 987-6543']
    }
  ];

  const services = [
    'Flight booking assistance',
    'Hotel reservations',
    'Travel insurance',
    'Visa applications',
    'Itinerary planning',
    'Emergency travel arrangements',
    'Group travel coordination',
    'Corporate travel management'
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Travel Desk
        </Typography>

        <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
          Your one-stop solution for all travel assistance and support
        </Typography>

        <Grid container spacing={4}>
          {supportOptions.map((option, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {option.icon}
                    <Typography variant="h5" component="h2" sx={{ ml: 1 }} color="primary">
                      {option.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {option.description}
                  </Typography>
                  <List dense>
                    {option.details.map((detail, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemText primary={detail} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Our Travel Desk Services
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={2}>
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body1" color="primary">
                      {service}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 6, textAlign: 'center', bgcolor: 'grey.50', p: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Need Immediate Assistance?
          </Typography>
          <Typography variant="body1" paragraph>
            Our travel desk is ready to help you with any travel-related queries or emergencies.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon color="primary" />
              <Typography variant="body1">Call: +1 (555) 123-4567</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon color="primary" />
              <Typography variant="body1">Email: support@travouge.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChatIcon color="primary" />
              <Typography variant="body1">Live Chat</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default TravelDeskPage;
