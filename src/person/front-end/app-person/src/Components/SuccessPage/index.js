import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import StatusBadge from '../StatusBadge';
import { usePerson } from '../../hooks/usePerson';

const SuccessPage = () => {
  const { person: personData, loading, error } = usePerson();

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
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Alert severity="error">
            Erro ao carregar dados: {error}
          </Alert>
        </Paper>
      </Container>
    );
  }

  if (!personData) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Alert severity="info">
            Nenhum dado encontrado.
          </Alert>
        </Paper>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          mb: 4,
          background: '#fff',
          borderRadius: 2,
          position: 'relative'
        }}
      >
        {/* Cabeçalho */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          borderBottom: '2px solid #e0e0e0',
          pb: 2
        }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            Cadastro Realizado com Sucesso
          </Typography>
          <StatusBadge status={personData.status} />
        </Box>

        {/* Conteúdo Principal */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          '& > *': {
            borderBottom: '1px solid #e0e0e0',
            pb: 3
          }
        }}>
          {/* Dados Pessoais */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Dados Pessoais
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {personData.type === 'INDIVIDUAL_ENTITY' ? 'Nome' : 'Razão Social'}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {personData.type === 'INDIVIDUAL_ENTITY' ? personData.name : personData.companyName}
                </Typography>
              </Box>
              {personData.type === 'INDIVIDUAL_ENTITY' && personData.birthDate && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Data de Nascimento
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(personData.birthDate)}
                  </Typography>
                </Box>
              )}
              {personData.type === 'INDIVIDUAL_ENTITY' && personData.isMEI !== undefined && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    MEI
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {personData.isMEI ? 'Sim' : 'Não'}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Documentos */}
          {personData.documents && personData.documents.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Documentos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2 }}>
                {personData.documents.map((doc) => (
                  <Box key={doc.id}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {doc.type}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {doc.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Endereço */}
          {personData.address && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Endereço
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pl: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {personData.address.street}, {personData.address.number}
                  {personData.address.complement && ` - ${personData.address.complement}`}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {personData.address.neighborhood && `${personData.address.neighborhood}, `}
                  {personData.address.city} - {personData.address.state}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  CEP: {personData.address.zipCode}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Telefones */}
          {personData.phones && personData.phones.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Telefones
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2 }}>
                {personData.phones.map((phone) => (
                  <Box key={phone.id}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {phone.type === 'CELL' ? 'Celular' : 'Telefone'}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {phone.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Informações do Registro */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Informações do Registro
            </Typography>
            <Grid container spacing={4} sx={{ pl: 2 }}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Data de Criação
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {new Date(personData.createdAt).toLocaleString('pt-BR')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Última Atualização
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {new Date(personData.updatedAt).toLocaleString('pt-BR')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SuccessPage; 