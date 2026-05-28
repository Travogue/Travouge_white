import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function ContentForm({ initialData, submitLabel, onSubmit }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [sections, setSections] = useState(initialData?.sections || []);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [newSectionIcon, setNewSectionIcon] = useState('');
  const [newSectionDetails, setNewSectionDetails] = useState('');

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      const newSection = {
        title: newSectionTitle,
        content: newSectionContent,
        icon: newSectionIcon || undefined,
        details: newSectionDetails ? newSectionDetails.split('\n').filter((d) => d.trim()) : undefined,
      };
      setSections([...sections, newSection]);
      setNewSectionTitle('');
      setNewSectionContent('');
      setNewSectionIcon('');
      setNewSectionDetails('');
    }
  };

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const contentData = {
      id: initialData?.id || '',
      title,
      content,
      sections,
    };
    onSubmit(contentData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {submitLabel}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Page Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Main Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              rows={4}
              placeholder="Enter the main content for this page..."
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Sections
            </Typography>
            <List>
              {sections.map((section, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={section.title}
                    secondary={section.content}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleRemoveSection(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Add New Section
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Section Title"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Icon (optional)"
                  value={newSectionIcon}
                  onChange={(e) => setNewSectionIcon(e.target.value)}
                  fullWidth
                  placeholder="e.g., FlightIcon, HotelIcon"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Section Content"
                  value={newSectionContent}
                  onChange={(e) => setNewSectionContent(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Details (one per line)"
                  value={newSectionDetails}
                  onChange={(e) => setNewSectionDetails(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Enter details, one per line..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddSection}
                  disabled={!newSectionTitle.trim()}
                >
                  Add Section
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              {submitLabel}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default ContentForm;
