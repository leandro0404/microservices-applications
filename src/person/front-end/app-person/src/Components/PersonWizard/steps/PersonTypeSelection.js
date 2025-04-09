import React, { useState, useEffect } from 'react';
import { 
  Box, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Typography, 
  Paper,
  TextField,
  FormControlLabel as MuiFormControlLabel,
  Checkbox,
  Grid
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PersonType from '../../../constants/PersonType';

const PersonTypeSelection = ({ onComplete, initialValue, readOnly = false }) => {
  // Garantir que formData seja sempre um objeto com valores válidos
  const [formData, setFormData] = useState(() => {
    // Se não houver dados iniciais, retorna um objeto vazio
    if (!initialValue) {
      return {
        type: '',
        name: '',
        birthDate: '',
        companyName: '',
        isMEI: false
      };
    }
    
    // Garantir que todos os campos tenham valores válidos
    return {
      type: String(initialValue.type || ''),
      name: String(initialValue.name || ''),
      birthDate: initialValue.birthDate ? initialValue.birthDate : '',
      companyName: String(initialValue.companyName || ''),
      isMEI: Boolean(initialValue.isMEI)
    };
  });

  useEffect(() => {
    // Validação básica - você pode adicionar mais regras conforme necessário
    const isValid = formData.type && (
      (formData.type === PersonType.INDIVIDUAL_ENTITY && formData.name && formData.birthDate) ||
      (formData.type === PersonType.LEGAL_ENTITY && formData.companyName)
    );
    
    if (isValid) {
      onComplete({
        type: formData.type,
        name: formData.name,
        birthDate: formData.birthDate,
        companyName: formData.companyName,
        isMEI: formData.isMEI
      });
    }
  }, [formData, onComplete]);

  useEffect(() => {
    if (initialValue) {
      setFormData({
        type: String(initialValue.type || ''),
        name: String(initialValue.name || ''),
        birthDate: initialValue.birthDate ? initialValue.birthDate : '',
        companyName: String(initialValue.companyName || ''),
        isMEI: Boolean(initialValue.isMEI)
      });
    }
  }, [initialValue]);

  const handleChange = (field) => (event) => {
    if (readOnly) return;
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (event) => {
    if (readOnly) return;
    setFormData(prev => ({
      ...prev,
      isMEI: event.target.checked
    }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {readOnly ? 'Tipo de pessoa' : 'Selecione o tipo de pessoa'}
      </Typography>
      
      {readOnly ? (
        // Modo somente leitura - mostra apenas os campos preenchidos
        <Box sx={{ mt: 2 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            {formData.type === PersonType.INDIVIDUAL_ENTITY ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PersonIcon />
                  <Typography variant="subtitle1">Pessoa Física</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nome Completo"
                      value={formData.name}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Data de Nascimento"
                      value={formData.birthDate}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <BusinessIcon />
                  <Typography variant="subtitle1">Pessoa Jurídica</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Razão Social"
                      value={formData.companyName}
                      disabled
                    />
                  </Grid>
                  {formData.isMEI && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        MEI - Microempreendedor Individual
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </Paper>
        </Box>
      ) : (
        // Modo de edição - mostra todos os campos
        <RadioGroup
          value={formData.type}
          onChange={handleChange('type')}
          sx={{ mt: 2 }}
        >
          <Paper 
            sx={{ 
              p: 2, 
              mb: 2, 
              cursor: readOnly ? 'default' : 'pointer',
              border: theme => formData.type === PersonType.INDIVIDUAL_ENTITY ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent'
            }}
            onClick={() => !readOnly && setFormData(prev => ({ ...prev, type: PersonType.INDIVIDUAL_ENTITY }))}
          >
            <FormControlLabel
              value={PersonType.INDIVIDUAL_ENTITY}
              control={<Radio disabled={readOnly} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon />
                  <Box>
                    <Typography variant="subtitle1">Pessoa Física</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Para pessoas físicas com CPF
                    </Typography>
                  </Box>
                </Box>
              }
            />

            {formData.type === PersonType.INDIVIDUAL_ENTITY && (
              <Box sx={{ mt: 2, pl: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nome Completo"
                      value={formData.name}
                      onChange={handleChange('name')}
                      disabled={readOnly}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Data de Nascimento"
                      value={formData.birthDate}
                      onChange={handleChange('birthDate')}
                      disabled={readOnly}
                      placeholder="DD/MM/AAAA"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>

          <Paper 
            sx={{ 
              p: 2, 
              mb: 2, 
              cursor: readOnly ? 'default' : 'pointer',
              border: theme => formData.type === PersonType.LEGAL_ENTITY ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent'
            }}
            onClick={() => !readOnly && setFormData(prev => ({ ...prev, type: PersonType.LEGAL_ENTITY }))}
          >
            <FormControlLabel
              value={PersonType.LEGAL_ENTITY}
              control={<Radio disabled={readOnly} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BusinessIcon />
                  <Box>
                    <Typography variant="subtitle1">Pessoa Jurídica</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Para empresas com CNPJ
                    </Typography>
                  </Box>
                </Box>
              }
            />

            {formData.type === PersonType.LEGAL_ENTITY && (
              <Box sx={{ mt: 2, pl: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Razão Social"
                      value={formData.companyName}
                      onChange={handleChange('companyName')}
                      disabled={readOnly}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiFormControlLabel
                      control={
                        <Checkbox
                          checked={formData.isMEI}
                          onChange={handleCheckboxChange}
                          disabled={readOnly}
                        />
                      }
                      label="Sou MEI (Microempreendedor Individual)"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </RadioGroup>
      )}
    </Box>
  );
};

export default PersonTypeSelection; 