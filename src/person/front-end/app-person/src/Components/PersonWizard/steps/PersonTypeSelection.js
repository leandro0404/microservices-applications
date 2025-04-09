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
  Grid,
  FormControl,
  FormLabel
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PersonType from '../../../constants/PersonType';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

// Estilos para o datepicker usando styled-components
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 56px;
  padding: 16.5px 14px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1976d2;
  }
  
  &:disabled {
    background-color: rgba(0, 0, 0, 0.12);
    cursor: not-allowed;
  }
`;

// Estilos para o container do datepicker
const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
  
  .react-datepicker {
    font-family: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 8px;
  }
  
  .react-datepicker__header {
    background-color: white;
    border-bottom: 1px solid #eee;
    padding: 8px;
  }
  
  .react-datepicker__month-container {
    float: none;
    width: 100%;
  }
  
  .react-datepicker__month {
    margin: 0;
    padding: 8px;
  }
  
  .react-datepicker__day-name {
    color: #666;
    font-weight: 500;
    width: 2rem;
    line-height: 2rem;
    margin: 0;
  }
  
  .react-datepicker__day {
    width: 2rem;
    line-height: 2rem;
    margin: 0;
    border-radius: 4px;
  }
  
  .react-datepicker__day:hover {
    background-color: #f0f0f0;
  }
  
  .react-datepicker__day--selected {
    background-color: #1976d2;
    color: white;
  }
  
  .react-datepicker__day--selected:hover {
    background-color: #1565c0;
  }
  
  .react-datepicker__day--today {
    background-color: #e3f2fd;
    color: #1976d2;
  }
  
  .react-datepicker__day--disabled {
    color: #ccc;
    cursor: not-allowed;
  }
  
  .react-datepicker__navigation {
    top: 8px;
  }
  
  .react-datepicker__navigation-icon::before {
    border-color: #666;
  }
  
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
    border-color: #666;
  }
  
  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .react-datepicker__year-option,
  .react-datepicker__month-option {
    padding: 8px;
  }
  
  .react-datepicker__year-option:hover,
  .react-datepicker__month-option:hover {
    background-color: #f0f0f0;
  }
  
  .react-datepicker__year-option--selected,
  .react-datepicker__month-option--selected {
    background-color: #1976d2;
    color: white;
  }
`;

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
        birthDate: initialValue.birthDate ? new Date(initialValue.birthDate) : null
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
        birthDate: formData.birthDate ? formData.birthDate.toISOString() : null
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

  const handleDateChange = (date) => {
    if (readOnly) return;
    setFormData(prev => ({
      ...prev,
      birthDate: date
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
    <Box>
      <Typography variant="h6" gutterBottom>
        Tipo de Pessoa
      </Typography>
      
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Selecione o tipo de pessoa</FormLabel>
        <RadioGroup
          value={formData.type}
          onChange={handleChange('type')}
          sx={{ mt: 2 }}
        >
          {/* Mostra a opção de Pessoa Física apenas se:
              1. Não estiver em modo somente leitura, ou
              2. Estiver em modo somente leitura E o tipo atual for INDIVIDUAL_ENTITY */}
          {(!readOnly || (readOnly && formData.type === PersonType.INDIVIDUAL_ENTITY)) && (
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
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nome Completo"
                        name="name"
                        value={formData.name}
                        onChange={handleChange('name')}
                        disabled={readOnly}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DatePicker
                        label="Data de Nascimento"
                        value={formData.birthDate}
                        onChange={(newValue) => handleDateChange(newValue)}
                        disabled={readOnly}
                        slotProps={{
                          textField: {
                            fullWidth: true
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          )}

          {/* Mostra a opção de Pessoa Jurídica apenas se:
              1. Não estiver em modo somente leitura, ou
              2. Estiver em modo somente leitura E o tipo atual for LEGAL_ENTITY */}
          {(!readOnly || (readOnly && formData.type === PersonType.LEGAL_ENTITY)) && (
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
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange('companyName')}
                        disabled={readOnly}
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                  </Grid>
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