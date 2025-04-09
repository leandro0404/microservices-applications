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
import PersonType from '../../../constants/PersonType';

const SpecificInfo = ({ onComplete, initialValue, personType }) => {
  const [formData, setFormData] = useState(initialValue || {
    // Campos para Pessoa Física
    name: '',
    motherName: '',
    birthDate: null,
    
    // Campos para Pessoa Jurídica
    companyName: '',
    tradingName: '',
    foundationDate: null,
    stateRegistration: '',
    municipalRegistration: '',
    industry: '',
    size: '',
    employeesCount: ''
  });

  useEffect(() => {
    // Validação básica - você pode adicionar mais regras conforme necessário
    const isValid = personType === PersonType.INDIVIDUAL_ENTITY 
      ? (formData.name && formData.motherName)
      : (formData.companyName && formData.tradingName);
      
    if (isValid) {
      onComplete(formData);
    }
  }, [formData, onComplete, personType]);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleDateChange = (field) => (date) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  if (personType === PersonType.INDIVIDUAL_ENTITY) {
    return (
      <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Informações da Pessoa Física
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nome Completo"
              value={formData.name}
              onChange={handleChange('name')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nome da Mãe"
              value={formData.motherName}
              onChange={handleChange('motherName')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker
                label="Data de Nascimento"
                value={formData.birthDate}
                onChange={handleDateChange('birthDate')}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Informações da Pessoa Jurídica
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Razão Social"
            value={formData.companyName}
            onChange={handleChange('companyName')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nome Fantasia"
            value={formData.tradingName}
            onChange={handleChange('tradingName')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de Fundação"
              value={formData.foundationDate}
              onChange={handleDateChange('foundationDate')}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Inscrição Estadual"
            value={formData.stateRegistration}
            onChange={handleChange('stateRegistration')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Inscrição Municipal"
            value={formData.municipalRegistration}
            onChange={handleChange('municipalRegistration')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Setor de Atividade</InputLabel>
            <Select
              value={formData.industry}
              label="Setor de Atividade"
              onChange={handleChange('industry')}
            >
              <MenuItem value="comercio">Comércio</MenuItem>
              <MenuItem value="industria">Indústria</MenuItem>
              <MenuItem value="servicos">Serviços</MenuItem>
              <MenuItem value="agropecuaria">Agropecuária</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Porte da Empresa</InputLabel>
            <Select
              value={formData.size}
              label="Porte da Empresa"
              onChange={handleChange('size')}
            >
              <MenuItem value="micro">Micro Empresa</MenuItem>
              <MenuItem value="pequena">Pequena Empresa</MenuItem>
              <MenuItem value="media">Média Empresa</MenuItem>
              <MenuItem value="grande">Grande Empresa</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Número de Funcionários"
            type="number"
            value={formData.employeesCount}
            onChange={handleChange('employeesCount')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpecificInfo; 