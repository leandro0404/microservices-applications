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
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Novo Telefone"
              value={newPhone}
              onChange={handlePhoneChange}
              onKeyPress={handleKeyPress}
              helperText="Digite o telefone e pressione Enter para adicionar"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddPhone}
              disabled={!newPhone.trim()}
            >
              Adicionar Telefone
            </Button>
          </Grid>
        </Grid>
      )}

      <List>
        {phones.map((phone, index) => (
          <Paper key={index} sx={{ mb: 1 }}>
            <ListItem>
              <ListItemText 
                primary={phone.value}
                secondary={`Tipo: ${phone.type === 'CELL' ? 'Celular' : 'Pessoal'}`}
              />
              {!readOnly && (
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => handleRemovePhone(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default PhoneInfo; 