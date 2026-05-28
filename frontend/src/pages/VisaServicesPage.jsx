import { Typography, Container, Box, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';

const VisaServicesPage = () => {
  const visaTypes = [
    {
      title: 'Tourist Visa',
      description: 'For leisure travel, sightseeing, and vacation purposes',
      duration: '30-90 days',
      processing: '5-10 business days'
    },
    {
      title: 'Business Visa',
      description: 'For business meetings, conferences, and professional activities',
      duration: '30-90 days',
      processing: '7-14 business days'
    },
    {
      title: 'Student Visa',
      description: 'For pursuing education and academic programs abroad',
      duration: 'Varies by program',
      processing: '15-30 business days'
    },
    {
      title: 'Work Visa',
      description: 'For employment and professional work opportunities',
      duration: 'Varies by contract',
      processing: '20-45 business days'
    },
    {
      title: 'Family Visa',
      description: 'For joining family members or dependent relatives',
      duration: 'Varies by relationship',
      processing: '10-20 business days'
    },
    {
      title: 'Transit Visa',
      description: 'For layovers and connecting flights through countries',
      duration: '1-7 days',
      processing: '3-7 business days'
    }
  ];

  const services = [
    'Document verification and preparation',
    'Application form assistance',
    'Appointment scheduling',
    'Biometric data collection',
    'Interview preparation and coaching',
    'Visa status tracking',
    'Rejection appeal support',
    'Express processing options'
  ];

  const requirements = [
    'Valid passport (minimum 6 months validity)',
    'Recent passport-sized photographs',
    'Completed visa application form',
    'Proof of travel purpose',
    'Financial statements and bank statements',
    'Employment letter or business documents',
    'Accommodation booking confirmation',
    'Travel itinerary and flight tickets',
    'Medical insurance (if required)',
    'Birth certificate or marriage certificate (if applicable)'
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Visa Services
        </Typography>

        <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
          Professional visa assistance for all your international travel needs
        </Typography>

        <Grid container spacing={4}>
          {visaTypes.map((visa, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h2" gutterBottom color="primary">
                    {visa.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {visa.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ScheduleIcon sx={{ mr: 1, fontSize: 16 }} />
                      Duration: {visa.duration}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <AssignmentIcon sx={{ mr: 1, fontSize: 16 }} />
                      Processing: {visa.processing}
                    </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button variant="outlined" color="primary" fullWidth>
                    Apply Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  Our Services
                </Typography>
                <List dense>
                  {services.map((service, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={service} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <AssignmentIcon sx={{ mr: 1 }} />
                  General Requirements
                </Typography>
                <List dense>
                  {requirements.map((requirement, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={requirement} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center', bgcolor: 'primary.light', p: 4, borderRadius: 2, color: 'white' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Apply for Your Visa?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Our expert visa consultants will guide you through the entire application process.
            Get personalized assistance and increase your chances of visa approval.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="secondary" size="large">
              Start Application
            </Button>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} size="large">
              Check Status
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default VisaServicesPage;
