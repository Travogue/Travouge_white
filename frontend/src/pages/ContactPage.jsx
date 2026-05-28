import { Typography, Container, Box, Grid, Card, CardContent, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContactPage = () => {
  const contactInfo = [
    {
      title: 'Address',
      details: [
        '123 Travel Street',
        'Adventure City, AC 12345',
        'United States'
      ],
      icon: <LocationOnIcon color="primary" />
    },
    {
      title: 'Phone',
      details: [
        '+1 (555) 123-4567',
        '+1 (555) 987-6543',
        'Toll-free: 1-800-TRAVOUGE'
      ],
      icon: <PhoneIcon color="primary" />
    },
    {
      title: 'Email',
      details: [
        'info@travouge.com',
        'support@travouge.com',
        'bookings@travouge.com'
      ],
      icon: <EmailIcon color="primary" />
    },
    {
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 8:00 PM',
        'Saturday: 9:00 AM - 6:00 PM',
        'Sunday: 10:00 AM - 4:00 PM',
        'Emergency: 24/7'
      ],
      icon: <AccessTimeIcon color="primary" />
    }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Contact Us
        </Typography>

        <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
          Get in touch with our travel experts for personalized assistance
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom color="primary">
              Get In Touch
            </Typography>
            <Typography variant="body1" paragraph>
              Have questions about our services? Need help planning your next adventure?
              Our team of travel experts is here to help you every step of the way.
            </Typography>

            {contactInfo.map((info, index) => (
              <Card key={index} elevation={2} sx={{ mb: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box sx={{ mr: 2, mt: 0.5 }}>
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {info.title}
                      </Typography>
                      <List dense disablePadding>
                        {info.details.map((detail, idx) => (
                          <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                            <ListItemText primary={detail} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Send us a Message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Visit Our Office
          </Typography>
          <Typography variant="body1" paragraph>
            Come visit us at our headquarters for personalized consultation and travel planning.
          </Typography>
          <Box sx={{ bgcolor: 'grey.100', p: 3, borderRadius: 2, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Office Location
            </Typography>
            <Typography variant="body2">
              123 Travel Street, Suite 100<br />
              Adventure City, AC 12345<br />
              United States
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Parking:</strong> Free parking available on premises
            </Typography>
            <Typography variant="body2">
              <strong>Public Transport:</strong> Bus stop "Travel Center" - 2 minute walk
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactPage;
