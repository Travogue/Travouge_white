import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Button, Stack, CircularProgress, Alert, Box, Tabs, Tab } from '@mui/material';
import { fetchPackages, createPackage, updatePackage, deletePackage, fetchContent, updateContent } from '../api.js';
import PackageForm from '../components/PackageForm.jsx';
import ContentForm from '../components/ContentForm.jsx';
import logo from '../assets/travouge-logo.svg';

function AdminDashboardPage() {
  const [packages, setPackages] = useState([]);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPackages();
    loadContent();
  }, []);

  const loadPackages = async () => {
    setLoading(true);
    try {
      const data = await fetchPackages();
      setPackages(data);
    } catch (err) {
      setError('Could not load packages.');
    } finally {
      setLoading(false);
    }
  };

  const loadContent = async () => {
    try {
      const data = await fetchContent();
      setContent(data);
    } catch (err) {
      console.error('Could not load content:', err);
    }
  };

  const handleCreate = async (formData) => {
    await createPackage(formData);
    setSuccess('Package created successfully.');
    setSelectedPackage(null);
    loadPackages();
  };

  const handleUpdate = async (formData) => {
    if (!selectedPackage) return;
    await updatePackage(selectedPackage.id, formData);
    setSuccess('Package updated successfully.');
    setSelectedPackage(null);
    loadPackages();
  };

  const handleEdit = (item) => {
    setSelectedPackage(item);
    setSuccess('');
    setError('');
  };

  const handleDelete = async (id) => {
    try {
      await deletePackage(id);
      setSuccess('Package deleted successfully.');
      loadPackages();
    } catch (err) {
      setError('Failed to delete package.');
    }
  };

  const handleContentUpdate = async (contentData) => {
    try {
      await updateContent(contentData.id, contentData);
      setSuccess('Content updated successfully.');
      setSelectedContent(null);
      loadContent();
    } catch (err) {
      setError('Failed to update content.');
    }
  };

  const handleContentEdit = (page) => {
    const contentItem = content[page] || { id: page, title: '', content: '', sections: [] };
    setSelectedContent(contentItem);
    setSuccess('');
    setError('');
  };

  const contentPages = [
    { id: 'about', label: 'About Page' },
    { id: 'services', label: 'Services Page' },
    { id: 'travel-desk', label: 'Travel Desk Page' },
    { id: 'visa-services', label: 'Visa Services Page' },
    { id: 'contact', label: 'Contact Page' },
  ];

  return (
    <div>
      <Box
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(15,48,87,0.95), rgba(215,38,61,0.92))',
          color: '#fff',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box component="img" src={logo} alt="Travouge logo" sx={{ height: 64, width: 'auto' }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Admin Control Center
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, maxWidth: 520 }}>
                Manage packages, update listings, and keep travel offerings fresh for your customers.
              </Typography>
            </Box>
          </Box>
          {activeTab === 0 && (
            <Button variant="contained" color="secondary" size="large" onClick={() => setSelectedPackage(null)}>
              New Package
            </Button>
          )}
        </Stack>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Packages" />
          <Tab label="Content Management" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Package Management
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Manage travel packages for the site. Use the form below to add or update listing information.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PackageForm
                initialData={selectedPackage ?? undefined}
                submitLabel={selectedPackage ? 'Update Package' : 'Create Package'}
                onSubmit={selectedPackage ? handleUpdate : handleCreate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, backgroundColor: '#fff' }}>
                <Stack spacing={2}>
                  <Typography variant="h6">Package List</Typography>
                  {success && <Alert severity="success">{success}</Alert>}
                  {error && <Alert severity="error">{error}</Alert>}
                  {loading ? (
                    <CircularProgress />
                  ) : packages.length === 0 ? (
                    <Typography>No packages available yet.</Typography>
                  ) : (
                    packages.map((item) => (
                      <Paper key={item.id} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {item.location} · ${item.price.toFixed(2)}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" size="small" onClick={() => handleEdit(item)}>
                            Edit
                          </Button>
                          <Button variant="contained" color="error" size="small" onClick={() => handleDelete(item.id)}>
                            Delete
                          </Button>
                        </Stack>
                      </Paper>
                    ))
                  )}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {activeTab === 1 && (
        <>
          <Typography variant="h5" gutterBottom>
            Content Management
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Manage website content for different pages. Click edit to modify page content.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {selectedContent ? (
                <ContentForm
                  initialData={selectedContent}
                  submitLabel="Update Content"
                  onSubmit={handleContentUpdate}
                />
              ) : (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    Select a page to edit content
                  </Typography>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, backgroundColor: '#fff' }}>
                <Stack spacing={2}>
                  <Typography variant="h6">Page Content</Typography>
                  {success && <Alert severity="success">{success}</Alert>}
                  {error && <Alert severity="error">{error}</Alert>}
                  {contentPages.map((page) => (
                    <Paper key={page.id} sx={{ p: 2, borderRadius: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {page.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {content[page.id]?.title || 'No content set'}
                      </Typography>
                      <Button variant="outlined" size="small" onClick={() => handleContentEdit(page.id)}>
                        Edit Content
                      </Button>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export default AdminDashboardPage;
