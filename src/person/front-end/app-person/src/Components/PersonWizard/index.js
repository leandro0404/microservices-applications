import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography,
  Paper,
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import PersonTypeSelection from './steps/PersonTypeSelection';
import DocumentInfo from './steps/DocumentInfo';
import AddressInfo from './steps/AddressInfo';
import PhoneInfo from './steps/PhoneInfo';
import StatusBadge from '../StatusBadge';
import { usePerson } from '../../hooks/usePerson';
import StatusType from '../../constants/StatusType';
import { AccountProvider } from '../../contexts/AccountContext';

const steps = [
  'Tipo de Pessoa',
  'Documentos',
  'Endereço',
  'Telefone'
];

const PersonWizardContent = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { person, loading, error, updatePerson } = usePerson();
  const [formData, setFormData] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Atualiza o formData quando os dados da pessoa são carregados
  useEffect(() => {
    if (person) {
      setFormData({
        type: person.type || '',
        name: person.name || '',
        birthDate: person.birthDate || '',
        companyName: person.companyName || '',
        isMEI: person.isMEI || false,
        documents: person.documents || [],
        address: person.address || {
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
          zipCode: ''
        },
        phones: person.phones || [],
        status: person.status
      });
    }
  }, [person]);

  // Verifica se o cadastro está em modo somente leitura
  const isReadOnly = formData?.status === StatusType.APPROVED || formData?.status === StatusType.PENDING;

  const isStepComplete = (step) => {
    if (!formData) return false;

    switch (step) {
      case 0: // PersonTypeSelection
        return formData.type && (
          (formData.type === 'INDIVIDUAL_ENTITY' && formData.name && formData.birthDate) ||
          (formData.type === 'LEGAL_ENTITY' && formData.companyName)
        );
      case 1: // DocumentInfo
        return formData.documents && formData.documents.length > 0;
      case 2: // AddressInfo
        return formData.address &&
          formData.address.street &&
          formData.address.number &&
          formData.address.city &&
          formData.address.state &&
          formData.address.zipCode;
      case 3: // PhoneInfo
        return formData.phones && formData.phones.length > 0;
      default:
        return false;
    }
  };

  // Atualiza o estado de conclusão dos passos
  useEffect(() => {
    if (!formData) return;
    
    const newCompleted = {};
    steps.forEach((_, index) => {
      if (isStepComplete(index)) {
        newCompleted[index] = true;
      }
    });
    setCompleted(newCompleted);
  }, [formData]);

  const handleNext = () => {
    if (isStepComplete(activeStep)) {
      const newCompleted = { ...completed };
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepClick = (step) => {
    if (completed[step] || step < activeStep) {
      setActiveStep(step);
    }
  };

  const handleSave = async () => {
    if (!formData) return;
    
    try {
      // Prepara os dados para enviar à API
      const personData = {
        type: formData.type,
        name: formData.name,
        birthDate: formData.birthDate || null,
        companyName: formData.companyName,
        isMEI: formData.isMEI,
        documents: formData.documents,
        address: formData.address,
        phones: formData.phones,
        status: StatusType.PENDING // Sempre define como PENDING ao salvar
      };

      const updatedPerson = await updatePerson(personData);
      if (onComplete) {
        onComplete(updatedPerson);
      }
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Erro ao salvar pessoa:', error);
    }
  };

  const handleStepDataChange = (stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
    setHasUnsavedChanges(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const getStepContent = (step) => {
    const commonProps = {
      onComplete: handleStepDataChange,
      initialValue: formData,
      readOnly: isReadOnly
    };

    switch (step) {
      case 0:
        return <PersonTypeSelection {...commonProps} />;
      case 1:
        return <DocumentInfo {...commonProps} />;
      case 2:
        return <AddressInfo {...commonProps} />;
      case 3:
        return <PhoneInfo {...commonProps} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Cadastro de Pessoa
          </Typography>
          {formData?.status && (
            <StatusBadge status={formData.status} />
          )}
        </Box>

        {isReadOnly && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Este cadastro está {formData?.status === StatusType.APPROVED ? 'aprovado' : 'pendente de aprovação'}. 
            Você pode visualizar os dados, mas não pode editá-los.
          </Alert>
        )}

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step 
              key={label} 
              completed={completed[index]}
              onClick={() => handleStepClick(index)}
              sx={{ 
                cursor: 'pointer',
                '& .MuiStepIcon-root.Mui-completed': {
                  color: 'success.main'
                }
              }}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Voltar
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!hasUnsavedChanges || isReadOnly || !isStepComplete(activeStep)}
              >
                Salvar
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepComplete(activeStep)}
              >
                Próximo
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

// Wrapper component that provides the AccountContext
const PersonWizard = ({ token, ...props }) => {
  const effectiveToken = token || window.appPreferenceToken;

  return (
    <AccountProvider externalToken={effectiveToken}>
      <PersonWizardContent {...props} />
    </AccountProvider>
  );
};

export default PersonWizard; 