import React, { useState, useEffect } from 'react';
import { 
  Box, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Typography, 
  Paper,
  TextField,
  Checkbox,
  FormControl,
  FormLabel,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PersonType from '../../../constants/PersonType';

const PersonTypeSelection = ({ onComplete, initialValue, readOnly = false }) => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    birthDate: null,
    companyName: '',
    isMEI: false
  });

  // Inicializa o formData com os valores iniciais
  useEffect(() => {
    if (initialValue) {
      setFormData({
        ...initialValue,
        birthDate: initialValue.birthDate ? new Date(initialValue.birthDate).toISOString().split('T')[0] : null
      });
    }
  }, [initialValue]);

  // Validação e chamada do onComplete
  useEffect(() => {
    // Validação básica
    const isValid = formData.type && (
      (formData.type === PersonType.INDIVIDUAL_ENTITY && formData.name && formData.birthDate) ||
      (formData.type === PersonType.LEGAL_ENTITY && formData.companyName)
    );
    
    if (isValid && !readOnly) {
      const dataToSend = {
        ...formData,
        birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : null
      };
      
      // Compara se os dados são diferentes dos anteriores para evitar loop
      const currentDataStr = JSON.stringify(dataToSend);
      const previousDataStr = JSON.stringify(initialValue);
      
      if (currentDataStr !== previousDataStr) {
        onComplete(dataToSend);
      }
    }
  }, [formData, onComplete, readOnly, initialValue]);

  const handleChange = (field) => (event) => {
    if (readOnly) return;
    const value = event.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (event) => {
    if (readOnly) return;
    setFormData(prev => ({
      ...prev,
      birthDate: event.target.value
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
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Tipo de Pessoa
      </Typography>
      
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormLabel 
          component="legend" 
          sx={{ 
            mb: 2,
            '&.MuiFormLabel-root': {
              position: 'relative',
              transform: 'none'
            }
          }}
        >
          Selecione o tipo de pessoa
        </FormLabel>

        <RadioGroup
          value={formData.type}
          onChange={handleChange('type')}
          sx={{ width: '100%' }}
        >
          {(!readOnly || (readOnly && formData.type === PersonType.INDIVIDUAL_ENTITY)) && (
            <Paper 
              sx={{ 
                p: 3, 
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
                sx={{ m: 0 }}
              />

              {formData.type === PersonType.INDIVIDUAL_ENTITY && (
                <Box sx={{ 
                  mt: 3,
                  ml: 4,
                  display: 'flex',
                  gap: 2
                }}>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      label="Nome Completo"
                      name="name"
                      value={formData.name}
                      onChange={handleChange('name')}
                      disabled={readOnly}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="birth-date">
                        Data de Nascimento
                      </InputLabel>
                      <OutlinedInput
                        id="birth-date"
                        type="date"
                        value={formData.birthDate || ''}
                        onChange={handleDateChange}
                        disabled={readOnly}
                        notched
                        label="Data de Nascimento"
                        sx={{
                          '& input': {
                            padding: '16.5px 14px',
                          }
                        }}
                      />
                      <FormHelperText>DD/MM/AAAA</FormHelperText>
                    </FormControl>
                  </Box>
                </Box>
              )}
            </Paper>
          )}

          {(!readOnly || (readOnly && formData.type === PersonType.LEGAL_ENTITY)) && (
            <Paper 
              sx={{ 
                p: 3, 
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
                sx={{ m: 0 }}
              />

              {formData.type === PersonType.LEGAL_ENTITY && (
                <Box sx={{ 
                  mt: 3,
                  ml: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}>
                  <TextField
                    fullWidth
                    label="Razão Social"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange('companyName')}
                    disabled={readOnly}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isMEI}
                        onChange={handleCheckboxChange}
                        disabled={readOnly}
                      />
                    }
                    label="É MEI (Microempreendedor Individual)"
                  />
                </Box>
              )}
            </Paper>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default PersonTypeSelection; 