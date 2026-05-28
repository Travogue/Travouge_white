import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function PackageCard({ item }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia component="img" height="220" image={item.imageUrl} alt={item.title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {item.location}
        </Typography>
        <Typography variant="body2">{item.description.slice(0, 120)}...</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
          ${item.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/packages/${item.id}`} size="small">
          View details
        </Button>
      </CardActions>
    </Card>
  );
}

export default PackageCard;
