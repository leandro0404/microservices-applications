import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Grid, 
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const PhoneInfo = ({ onComplete, initialValue, readOnly = false }) => {
  // Garantir que phones seja sempre um array de objetos com id, type e value
  const [phones, setPhones] = useState(() => {
    if (!initialValue?.phones) return [];
    
    return initialValue.phones.map(phone => {
      if (typeof phone === 'string') {
        return {
          id: `phone-${Date.now()}-${Math.random()}`,
          type: 'CELL',
          value: phone
        };
      }
      if (phone && typeof phone === 'object') {
        return {
          id: phone.id || `phone-${Date.now()}-${Math.random()}`,
          type: phone.type || 'CELL',
          value: phone.value || ''
        };
      }
      return null;
    }).filter(phone => phone !== null);
  });
  
  const [newPhone, setNewPhone] = useState('');
  const [newPhoneType, setNewPhoneType] = useState('CELL');

  useEffect(() => {
    if (phones.length > 0) {
      onComplete({ phones });
    }
  }, [phones, onComplete]);

  const handleAddPhone = () => {
    if (readOnly) return;
    if (newPhone.trim()) {
      const phone = {
        id: `phone-${Date.now()}-${Math.random()}`,
        type: newPhoneType,
        value: newPhone.trim()
      };
      setPhones([...phones, phone]);
      setNewPhone('');
    }
  };

  const handleRemovePhone = (index) => {
    if (readOnly) return;
    const updatedPhones = phones.filter((_, i) => i !== index);
    setPhones(updatedPhones);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddPhone();
    }
  };

  const handlePhoneChange = (event) => {
    if (readOnly) return;
    setNewPhone(event.target.value);
  };

  const handlePhoneTypeChange = (event) => {
    if (readOnly) return;
    setNewPhoneType(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {readOnly ? 'Telefones' : 'Informações de Telefone'}
      </Typography>

      {!readOnly && (
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={newPhoneType}
                  onChange={handlePhoneTypeChange}
                  label="Tipo"
                >
                  <MenuItem value="CELL">Celular</MenuItem>
                  <MenuItem value="PERSONAL">Pessoal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ 
                display: 'flex',
                gap: 1
              }}>
                <TextField
                  fullWidth
                  label="Novo Telefone"
                  value={newPhone}
                  onChange={handlePhoneChange}
                  onKeyPress={handleKeyPress}
                />
                <IconButton
                  onClick={handleAddPhone}
                  disabled={!newPhone.trim()}
                  sx={{ 
                    height: 56,
                    width: 56,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'action.disabledBackground',
                      color: 'action.disabled'
                    }
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        {phones.map((phone, index) => (
          <Paper 
            key={phone.id} 
            sx={{ 
              p: 2,
              mb: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Box>
              <Typography variant="subtitle1">
                {phone.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {phone.type === 'CELL' ? 'Celular' : 'Pessoal'}
              </Typography>
            </Box>
            {!readOnly && (
              <IconButton 
                onClick={() => handleRemovePhone(index)}
                sx={{
                  color: 'error.main',
                  '&:hover': {
                    color: 'error.dark'
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default PhoneInfo; 