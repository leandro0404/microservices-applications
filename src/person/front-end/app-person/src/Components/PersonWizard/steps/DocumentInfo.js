import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  Grid, 
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DocumentType from '../../../constants/DocumentType';

const DocumentInfo = ({ onComplete, initialValue, readOnly = false }) => {
  // Garantir que documents seja sempre um array de objetos válidos
  const [documents, setDocuments] = useState(() => {
    if (!initialValue?.documents) return [];
    
    return initialValue.documents.map(doc => {
      // Se já for um objeto com a estrutura correta, retorna ele
      if (doc && typeof doc === 'object' && doc.type && doc.value) {
        return {
          type: doc.type,
          value: doc.value,
          id: doc.id || Date.now().toString()
        };
      }
      
      // Se for uma string, assume que é um CPF
      if (typeof doc === 'string') {
        return {
          type: DocumentType.CPF,
          value: doc,
          id: Date.now().toString()
        };
      }
      
      // Caso contrário, retorna um objeto vazio
      return {
        type: DocumentType.CPF,
        value: '',
        id: Date.now().toString()
      };
    }).filter(doc => doc.value !== '');
  });
  
  const [newDocument, setNewDocument] = useState({
    type: DocumentType.CPF,
    value: '',
    id: Date.now().toString()
  });

  // Usar useRef para armazenar o valor anterior dos documentos
  const prevDocumentsRef = useRef(documents);

  useEffect(() => {
    // Validação básica - você pode adicionar mais regras conforme necessário
    const isValid = documents.length > 0;
    
    // Verificar se os documentos realmente mudaram
    const prevDocumentsStr = JSON.stringify(prevDocumentsRef.current);
    const currentDocumentsStr = JSON.stringify(documents);
    
    if (isValid && prevDocumentsStr !== currentDocumentsStr) {
      // Atualizar a referência para o próximo ciclo
      prevDocumentsRef.current = documents;
      
      // Chamar onComplete apenas se os documentos mudaram
      onComplete({ documents });
    }
  }, [documents, onComplete]);

  const handleChange = (field) => (event) => {
    if (readOnly) return;
    const value = event.target.value;
    setNewDocument(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDocumentChange = (event) => {
    if (readOnly) return;
    const value = event.target.value.replace(/\D/g, '');
    setNewDocument(prev => ({
      ...prev,
      value
    }));
  };

  const handleAddDocument = () => {
    if (readOnly) return;
    if (newDocument.value && newDocument.type) {
      setDocuments(prev => [...prev, { ...newDocument }]);
      setNewDocument({
        type: DocumentType.CPF,
        value: '',
        id: Date.now().toString()
      });
    }
  };

  const handleRemoveDocument = (index) => {
    if (readOnly) return;
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const formatDocument = (type, value) => {
    const cleaned = value.replace(/\D/g, '');
    
    switch (type) {
      case DocumentType.CPF:
        const cpfMatch = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        return cpfMatch ? `${cpfMatch[1]}.${cpfMatch[2]}.${cpfMatch[3]}-${cpfMatch[4]}` : value;
      
      case DocumentType.CNPJ:
        const cnpjMatch = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
        return cnpjMatch ? `${cnpjMatch[1]}.${cnpjMatch[2]}.${cnpjMatch[3]}/${cnpjMatch[4]}-${cnpjMatch[5]}` : value;
      
      default:
        return value;
    }
  };

  const getDocumentLabel = (type) => {
    switch (type) {
      case DocumentType.CPF:
        return 'CPF';
      case DocumentType.CNPJ:
        return 'CNPJ';
      case DocumentType.RG:
        return 'RG';
      case DocumentType.DOCUMENT:
        return 'Documento';
      default:
        return type;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {readOnly ? 'Documentos' : 'Informações de Documentos'}
      </Typography>

      {!readOnly && (
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Documento</InputLabel>
                <Select
                  value={newDocument.type}
                  onChange={handleChange('type')}
                  label="Tipo de Documento"
                >
                  <MenuItem value={DocumentType.CPF}>CPF</MenuItem>
                  <MenuItem value={DocumentType.CNPJ}>CNPJ</MenuItem>
                  <MenuItem value={DocumentType.RG}>RG</MenuItem>
                  <MenuItem value={DocumentType.DOCUMENT}>Documento</MenuItem>
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
                  label={getDocumentLabel(newDocument.type)}
                  value={newDocument.value}
                  onChange={handleDocumentChange}
                  required
                />
                <IconButton
                  onClick={handleAddDocument}
                  disabled={!newDocument.value}
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
        {documents.map((doc, index) => (
          <Paper 
            key={doc.id} 
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
                {formatDocument(doc.type, doc.value)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getDocumentLabel(doc.type)}
              </Typography>
            </Box>
            {!readOnly && (
              <IconButton 
                onClick={() => handleRemoveDocument(index)}
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

export default DocumentInfo; 