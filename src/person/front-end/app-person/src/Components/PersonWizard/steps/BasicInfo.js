import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Grid, 
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ptBR from 'date-fns/locale/pt-BR';

const BasicInfo = ({ onComplete, initialValue }) => {
  const [formData, setFormData] = useState(initialValue || {
    email: '',
    gender: '',
    birthDate: null,
    maritalStatus: '',
    occupation: '',
    nationality: 'Brasileira',
    naturality: '',
    observation: ''
  });

  useEffect(() => {
    // Validação básica - você pode adicionar mais regras conforme necessário
    const isValid = formData.email && formData.gender;
    if (isValid) {
      onComplete(formData);
    }
  }, [formData, onComplete]);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      birthDate: date
    }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Informações Básicas
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Gênero</InputLabel>
            <Select
              value={formData.gender}
              label="Gênero"
              onChange={handleChange('gender')}
            >
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Feminino</MenuItem>
              <MenuItem value="O">Outro</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de Nascimento"
              value={formData.birthDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Estado Civil</InputLabel>
            <Select
              value={formData.maritalStatus}
              label="Estado Civil"
              onChange={handleChange('maritalStatus')}
            >
              <MenuItem value="solteiro">Solteiro(a)</MenuItem>
              <MenuItem value="casado">Casado(a)</MenuItem>
              <MenuItem value="divorciado">Divorciado(a)</MenuItem>
              <MenuItem value="viuvo">Viúvo(a)</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Profissão"
            value={formData.occupation}
            onChange={handleChange('occupation')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nacionalidade"
            value={formData.nationality}
            onChange={handleChange('nationality')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Naturalidade"
            value={formData.naturality}
            onChange={handleChange('naturality')}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Observações"
            multiline
            rows={4}
            value={formData.observation}
            onChange={handleChange('observation')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicInfo; 