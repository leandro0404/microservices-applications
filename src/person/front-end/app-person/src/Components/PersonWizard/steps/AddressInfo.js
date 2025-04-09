import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Grid,
  Typography
} from '@mui/material';

const AddressInfo = ({ onComplete, initialValue, readOnly = false }) => {
  // Garantir que formData seja sempre um objeto com strings
  const [formData, setFormData] = useState(() => {
    // Se não houver dados iniciais, retorna um objeto vazio
    if (!initialValue?.address) {
      return {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      };
    }
    
    // Garantir que todos os campos sejam strings
    return {
      street: String(initialValue.address.street || ''),
      number: String(initialValue.address.number || ''),
      complement: String(initialValue.address.complement || ''),
      neighborhood: String(initialValue.address.neighborhood || ''),
      city: String(initialValue.address.city || ''),
      state: String(initialValue.address.state || ''),
      zipCode: String(initialValue.address.zipCode || '')
    };
  });

  useEffect(() => {
    // Validação básica - você pode adicionar mais regras conforme necessário
    const isValid = formData.street && 
                   formData.number && 
                   formData.neighborhood && 
                   formData.city && 
                   formData.state && 
                   formData.zipCode;
    
    if (isValid) {
      onComplete({ address: formData });
    }
  }, [formData, onComplete]);

  const handleChange = (field) => (event) => {
    if (readOnly) return;
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Informações de Endereço
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Logradouro"
            value={formData.street}
            onChange={handleChange('street')}
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Número"
            value={formData.number}
            onChange={handleChange('number')}
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Complemento"
            value={formData.complement}
            onChange={handleChange('complement')}
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bairro"
            value={formData.neighborhood}
            onChange={handleChange('neighborhood')}
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Cidade"
            value={formData.city}
            onChange={handleChange('city')}
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Estado"
            value={formData.state}
            onChange={handleChange('state')}
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="CEP"
            value={formData.zipCode}
            onChange={handleChange('zipCode')}
            required
            disabled={readOnly}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressInfo; 