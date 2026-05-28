import { useState, useEffect } from 'react';
import { Typography, Container, Box, Grid, Card, CardContent } from '@mui/material';
import { fetchContentByPage } from '../api.js';
import logo from '../assets/travouge-logo.svg';

const AboutPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchContentByPage('about');
        setContent(data);
      } catch (error) {
        console.error('Failed to load about content:', error);
        setContent({
          id: 'about',
          title: 'About Travouge',
          content: 'Your trusted travel partner for unforgettable journeys',
          sections: [
            {
              title: 'Our Story',
              content:
                'Travouge was founded with a vision to make travel accessible, enjoyable, and memorable for everyone. With years of experience in the travel industry, we specialize in creating personalized travel experiences that cater to your unique preferences and dreams.',
            },
            {
              title: 'Our Mission',
              content:
                'To provide exceptional travel services that exceed expectations, ensuring every journey becomes a cherished memory. We believe in responsible tourism and sustainable travel practices that benefit both travelers and local communities.',
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  const sections = content?.sections?.length ? content.sections : [
    {
      title: 'Our Story',
      content:
        'Travouge was founded with a vision to make travel accessible, enjoyable, and memorable for everyone. With years of experience in the travel industry, we specialize in creating personalized travel experiences that cater to your unique preferences and dreams.',
    },
    {
      title: 'Our Mission',
      content:
        'To provide exceptional travel services that exceed expectations, ensuring every journey becomes a cherished memory. We believe in responsible tourism and sustainable travel practices that benefit both travelers and local communities.',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: 5,
          mb: 4,
          px: { xs: 3, md: 4 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(15,48,87,0.96), rgba(215,38,61,0.95))',
          color: '#fff',
          boxShadow: '0 26px 70px rgba(0,0,0,0.22)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box component="img" src={logo} alt="Travouge logo" sx={{ height: 84, width: 'auto' }} />
        </Box>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          {content?.title || 'About Travouge'}
        </Typography>
        <Typography variant="h6" paragraph align="center" sx={{ mb: 1, color: 'rgba(255,255,255,0.9)' }}>
          {content?.content || 'Your trusted travel partner for unforgettable journeys'}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {sections.map((section, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  {section.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {section.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Why Choose Travouge?
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom>
                    Expert Guidance
                  </Typography>
                  <Typography variant="body2">
                    Our experienced travel consultants provide personalized recommendations and expert advice.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom>
                    Best Prices
                  </Typography>
                  <Typography variant="body2">
                    We negotiate the best deals and offer competitive pricing on all our travel packages.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom>
                    24/7 Support
                  </Typography>
                  <Typography variant="body2">
                    Round-the-clock customer support to ensure your journey is smooth and worry-free.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
