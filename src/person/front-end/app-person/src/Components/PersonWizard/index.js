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
import { useNavigate } from 'react-router-dom';
import StatusType from '../../constants/StatusType';

const steps = [
  'Tipo de Pessoa',
  'Documentos',
  'Endereço',
  'Telefone'
];

const PersonWizard = ({ onComplete }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { person, loading, error, updatePerson } = usePerson();
  const [formData, setFormData] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Atualiza o formData quando os dados da pessoa são carregados
  useEffect(() => {
    if (person) {
      setFormData(person);
    }
  }, [person]);

  // Verifica se o cadastro está em modo somente leitura
  const isReadOnly = formData?.status === StatusType.APPROVED || formData?.status === StatusType.PENDING;

  // Atualiza o estado de conclusão dos passos quando os dados são carregados
  useEffect(() => {
    if (!formData) return;

    const newCompleted = {};
    
    // Verifica se cada passo está completo
    if (formData.type && (
      (formData.type === 'INDIVIDUAL_ENTITY' && formData.name && formData.birthDate) ||
      (formData.type === 'LEGAL_ENTITY' && formData.companyName)
    )) {
      newCompleted[0] = true;
    }
    
    if (formData.documents && formData.documents.length > 0) {
      newCompleted[1] = true;
    }
    
    if (formData.address && 
      formData.address.street && 
      formData.address.number && 
      formData.address.city && 
      formData.address.state && 
      formData.address.zipCode) {
      newCompleted[2] = true;
    }
    
    if (formData.phones && formData.phones.length > 0) {
      newCompleted[3] = true;
    }
    
    setCompleted(newCompleted);
  }, [formData]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepClick = (step) => {
    // Permite navegar para um passo se ele estiver completo ou se for o passo atual
    if (completed[step] || step === activeStep) {
      setActiveStep(step);
    }
  };

  const handleStepComplete = (stepData) => {
    const newData = { ...formData, ...stepData };
    setFormData(newData);
    setHasUnsavedChanges(true);
  };

  const getStepContent = (step) => {
    const commonProps = {
      onComplete: handleStepComplete,
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

  const isStepValid = (step) => {
    if (isReadOnly) return true;
    
    switch (step) {
      case 0:
        return formData?.type && (
          (formData.type === 'INDIVIDUAL_ENTITY' && formData.name && formData.birthDate) ||
          (formData.type === 'LEGAL_ENTITY' && formData.companyName)
        );
      case 1:
        return formData?.documents && formData.documents.length > 0;
      case 2:
        return formData?.address && 
          formData.address.street && 
          formData.address.number && 
          formData.address.city && 
          formData.address.state && 
          formData.address.zipCode;
      case 3:
        return formData?.phones && formData.phones.length > 0;
      default:
        return false;
    }
  };

  const handleFinish = async () => {
    try {
      const updatedFormData = { ...formData, status: StatusType.PENDING };
      await updatePerson(updatedFormData);
      setHasUnsavedChanges(false);
      
      if (onComplete) {
        onComplete(updatedFormData);
      }
      
      navigate('/success');
    } catch (error) {
      console.error('Erro ao finalizar cadastro:', error);
    }
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
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
          <Alert severity="error">
            Erro ao carregar dados: {error}
          </Alert>
        </Paper>
      </Container>
    );
  }

  if (!formData) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
          <Alert severity="info">
            Nenhum dado encontrado.
          </Alert>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            Cadastro de Pessoa
          </Typography>
          <StatusBadge status={formData.status} />
        </Box>
        
        {isReadOnly && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Este cadastro está aprovado. Você pode visualizar os dados, mas não pode editá-los.
          </Alert>
        )}
        
        {formData.status === StatusType.PENDING && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Este cadastro está pendente de aprovação e não pode ser editado até que seja aprovado ou rejeitado.
          </Alert>
        )}
        
        {hasUnsavedChanges && !isReadOnly && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Você tem alterações não salvas. Clique em "Finalizar" para salvar todas as alterações.
          </Alert>
        )}
        
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel 
          sx={{ 
            mb: 4,
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'success.main',
            },
            '& .MuiStepIcon-root.Mui-completed': {
              color: 'success.main',
            },
          }}
        >
          {steps.map((label, index) => (
            <Step 
              key={label} 
              completed={completed[index]}
              onClick={() => handleStepClick(index)}
              sx={{ 
                cursor: completed[index] || index === activeStep ? 'pointer' : 'default',
                '& .MuiStepLabel-root': {
                  cursor: completed[index] || index === activeStep ? 'pointer' : 'default',
                }
              }}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2, mb: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Voltar
          </Button>
          
          {(activeStep < steps.length - 1 || !isReadOnly) && (
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
              disabled={!isStepValid(activeStep)}
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default PersonWizard; 