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
import { format } from 'date-fns';
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

  const formatDate = (dateString, includeTime = false) => {
    try {
      return format(
        new Date(dateString),
        includeTime ? 'dd/MM/yyyy HH:mm:ss' : 'dd/MM/yyyy'
      );
    } catch {
      return dateString;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1">
            Cadastro Realizado com Sucesso
          </Typography>
          <StatusBadge status={personData.status} />
        </Box>

        <Grid container spacing={3}>
          {/* Dados Pessoais */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Dados Pessoais
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  {personData.type === 'INDIVIDUAL_ENTITY' ? 'Nome' : 'Razão Social'}
                </Typography>
                <Typography>{personData.type === 'INDIVIDUAL_ENTITY' ? personData.name : personData.companyName}</Typography>
              </Grid>
              {personData.type === 'INDIVIDUAL_ENTITY' && personData.birthDate && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Data de Nascimento
                  </Typography>
                  <Typography>{formatDate(personData.birthDate)}</Typography>
                </Grid>
              )}
              {personData.type === 'INDIVIDUAL_ENTITY' && personData.isMEI !== undefined && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    MEI
                  </Typography>
                  <Typography>{personData.isMEI ? 'Sim' : 'Não'}</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Documentos */}
          {personData.documents && personData.documents.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Documentos
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {personData.documents.map((doc) => (
                  <Grid item xs={12} sm={6} key={doc.id}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {doc.type}
                    </Typography>
                    <Typography>{doc.value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {/* Endereço */}
          {personData.address && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Endereço
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    {personData.address.street}, {personData.address.number}
                    {personData.address.complement && ` - ${personData.address.complement}`}
                  </Typography>
                  <Typography>
                    {personData.address.neighborhood && `${personData.address.neighborhood}, `}
                    {personData.address.city} - {personData.address.state}
                  </Typography>
                  <Typography>
                    CEP: {personData.address.zipCode}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* Telefones */}
          {personData.phones && personData.phones.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Telefones
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {personData.phones.map((phone) => (
                  <Grid item xs={12} sm={6} key={phone.id}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {phone.type === 'CELL' ? 'Celular' : 'Telefone'}
                    </Typography>
                    <Typography>{phone.value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {/* Datas de Criação e Atualização */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Informações do Registro
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Data de Criação
                </Typography>
                <Typography>{formatDate(personData.createdAt, true)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Última Atualização
                </Typography>
                <Typography>{formatDate(personData.updatedAt, true)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SuccessPage; 