import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfileCard = ({ profile, onEdit, onDelete }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', boxShadow: 3, position: 'relative' }}>
      <CardMedia
        component="img"
        sx={{
          width: 120,
          height: 120,
          objectFit: 'cover',
          borderRadius: '50%',  // Tornando a imagem redonda
        }}
        image={profile.avatar?.url || '/default-avatar.png'}
        alt={profile.name}
      />
      <CardContent sx={{ flex: 1, padding: 2 }}>
         {/* Label para Helm */}
         <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', width: '100px' }}>
            Helm:
          </Typography>
          <Typography variant="body2" sx={{ marginLeft: 2, fontStyle: 'italic' }}>
            {profile.helm}
          </Typography>
        </Box>
        {/* Label para Nome */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', width: '100px' }}>
            Nome:
          </Typography>
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            {profile.name}
          </Typography>
        </Box>

        {/* Label para Biografia */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', width: '100px' }}>
            Biografia:
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 2 }}>
            {profile.biography}
          </Typography>
        </Box>
      </CardContent>

      {/* Ícones de ação posicionados no canto superior direito */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => onEdit(profile.id)}
          sx={{
            padding: '4px',
            backgroundColor: 'white',
            boxShadow: 2,
            borderRadius: '50%',
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => onDelete(profile.id)}
          sx={{
            padding: '4px',
            backgroundColor: 'white',
            boxShadow: 2,
            borderRadius: '50%',
          }}
        >
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProfileCard;
