import React from 'react';
import { Box, Typography, Link, Paper, Chip, useTheme, useMediaQuery } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Definindo as cores base para cada aplicação
  const colors = {
    root: {
      bg: '#ffffff',
      border: '#1976d2',
      hover: '#1976d210',
      text: '#1976d2',
      icon: '#1976d2'
    },
    preference: {
      bg: '#ffffff',
      border: '#2e7d32',
      hover: '#2e7d3210',
      text: '#2e7d32',
      icon: '#2e7d32'
    },
    profile: {
      bg: '#ffffff',
      border: '#ed6c02',
      hover: '#ed6c0210',
      text: '#ed6c02',
      icon: '#ed6c02'
    },
    person: {
      bg: '#ffffff',
      border: '#9c27b0',
      hover: '#9c27b010',
      text: '#9c27b0',
      icon: '#9c27b0'
    }
  };

  // Estilo comum para os cards
  const commonCardStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#ffffff',
    borderRadius: 0,
    width: '245px',
    height: '220px',
    position: 'relative',
    transition: 'all 0.3s ease-in-out',
    border: '1px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  // Estilo para o container de conteúdo do card
  const cardContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  };

  // Estilo para o container de APIs
  const apiContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
    padding: 1,
    borderRight: '1px solid #e0e0e0',
    marginRight: 1,
  };

  // Estilo comum para os links
  const commonLinkStyle = {
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: 0,
    textAlign: 'center',
    transition: 'all 0.2s ease-in-out',
    fontSize: '0.75rem',
    marginTop: 0.5,
    width: '90%',
    fontWeight: 500,
  };

  // Estilo para os chips de API
  const apiChipStyle = {
    backgroundColor: '#f5f5f5',
    border: '1px solid #e0e0e0',
    borderRadius: 0,
    '& .MuiChip-icon': {
      color: '#757575',
    },
    '& .MuiChip-label': {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
  };

  // Estilo para os títulos das seções
  const sectionTitleStyle = {
    color: '#1a237e',
    fontWeight: 600,
    marginBottom: 2,
    textAlign: 'center',
    fontSize: '1.25rem',
  };

  // Estilo para os textos de descrição
  const descriptionTextStyle = {
    color: '#424242',
    lineHeight: 1.6,
    textAlign: 'center',
    marginBottom: 2,
    fontSize: '0.875rem',
  };

  // Estilo para os boxes de API
  const apiBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    padding: 1.5,
    backgroundColor: '#f5f5f5',
    borderRadius: 0,
    border: '1px solid #e0e0e0',
  };

  // Estilo para o box de backend
  const backendBoxStyle = {
    backgroundColor: '#f5f5f5',
    padding: 2,
    borderRadius: 0,
    border: '1px solid #e0e0e0',
  };

  // Estilo para os chips de tecnologia
  const techChipStyle = {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    border: '1px solid #90caf9',
    borderRadius: 0,
    '& .MuiChip-label': {
      fontWeight: 500,
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 0,
        width: '100%',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        maxWidth: 1200,
        width: '100%',
        padding: { xs: 1, sm: 2 },
        margin: 0,
        boxSizing: 'border-box',
      }}>
        {/* Container dos Cards */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          padding: 0,
          margin: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {/* App-Root - Topo */}
          <Paper elevation={1} sx={{
            ...commonCardStyle,
            borderLeft: `4px solid ${colors.root.border}`,
            '&:hover': {
              backgroundColor: colors.root.hover,
              transform: 'translateY(-5px)',
            },
            width: { xs: '100%', sm: '245px' },
            maxWidth: '245px',
          }}>
            <Box sx={apiContainerStyle}>
              <Chip
                icon={<AccountCircleIcon />}
                label="API Account"
                size="small"
                sx={apiChipStyle}
              />
            </Box>
            <Box sx={cardContentStyle}>
              <Typography variant="h6" sx={{ fontWeight: 500, color: '#495057', mb: 1, fontSize: '1rem' }}>App Root</Typography>
              <Typography variant="body2" sx={{ color: '#6c757d', mb: 1, textAlign: 'center', fontSize: '0.75rem' }}>
                Aplicação Principal
              </Typography>
              <Link
                href="https://d13o1rfshhax5u.cloudfront.net/"
                target="_blank"
                sx={{
                  ...commonLinkStyle,
                  color: colors.root.border,
                  border: `1px solid ${colors.root.border}`,
                  '&:hover': {
                    backgroundColor: colors.root.hover,
                  }
                }}
              >
                Acessar App Root
              </Link>
            </Box>
          </Paper>

          {/* Base - App-Preference e App-Profile */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            width: '100%',
            flexWrap: 'wrap',
          }}>
            {/* App-Preference */}
            <Paper elevation={1} sx={{
              ...commonCardStyle,
              borderLeft: `4px solid ${colors.preference.border}`,
              '&:hover': {
                backgroundColor: colors.preference.hover,
                transform: 'translateY(-5px)',
              },
            }}>
              <Box sx={apiContainerStyle}>
                <Chip
                  icon={<AccountCircleIcon />}
                  label="API Account"
                  size="small"
                  sx={apiChipStyle}
                />
                <Chip
                  icon={<SettingsIcon />}
                  label="API Preference"
                  size="small"
                  sx={apiChipStyle}
                />
              </Box>
              <Box sx={cardContentStyle}>
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#495057', mb: 1, fontSize: '1rem' }}>App Preference</Typography>
                <Typography variant="body2" sx={{ color: '#6c757d', mb: 1, textAlign: 'center', fontSize: '0.75rem' }}>
                  Gerenciamento de Preferências
                </Typography>
                <Link
                  href="https://dxhbpm58i19u8.cloudfront.net"
                  target="_blank"
                  sx={{
                    ...commonLinkStyle,
                    color: colors.preference.border,
                    border: `1px solid ${colors.preference.border}`,
                    '&:hover': {
                      backgroundColor: colors.preference.hover,
                    }
                  }}
                >
                  Preferences App
                </Link>
              </Box>
            </Paper>

            {/* App-Profile */}
            <Paper elevation={1} sx={{
              ...commonCardStyle,
              borderLeft: `4px solid ${colors.profile.border}`,
              '&:hover': {
                backgroundColor: colors.profile.hover,
                transform: 'translateY(-5px)',
              },
            }}>
              <Box sx={apiContainerStyle}>
                <Chip
                  icon={<AccountCircleIcon />}
                  label="API Account"
                  size="small"
                  sx={apiChipStyle}
                />
                <Chip
                  icon={<StorageIcon />}
                  label="API Profile"
                  size="small"
                  sx={apiChipStyle}
                />
              </Box>
              <Box sx={cardContentStyle}>
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#495057', mb: 1, fontSize: '1rem' }}>App Profile</Typography>
                <Typography variant="body2" sx={{ color: '#6c757d', mb: 1, textAlign: 'center', fontSize: '0.75rem' }}>
                  Gerenciamento de Perfis
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%', alignItems: 'center' }}>
                  <Link
                    href="https://d3nezuk5ua2jlf.cloudfront.net"
                    target="_blank"
                    sx={{
                      ...commonLinkStyle,
                      color: colors.profile.border,
                      border: `1px solid ${colors.profile.border}`,
                      '&:hover': {
                        backgroundColor: colors.profile.hover,
                      }
                    }}
                  >
                    Profile Listagem
                  </Link>
                  <Link
                    href="https://d3nezuk5ua2jlf.cloudfront.net/#/default"
                    target="_blank"
                    sx={{
                      ...commonLinkStyle,
                      color: colors.profile.border,
                      border: `1px solid ${colors.profile.border}`,
                      '&:hover': {
                        backgroundColor: colors.profile.hover,
                      }
                    }}
                  >
                    Profile Default
                  </Link>
                  <Link
                    href="https://d3nezuk5ua2jlf.cloudfront.net/#/create"
                    target="_blank"
                    sx={{
                      ...commonLinkStyle,
                      color: colors.profile.border,
                      border: `1px solid ${colors.profile.border}`,
                      '&:hover': {
                        backgroundColor: colors.profile.hover,
                      }
                    }}
                  >
                    Criar Perfil
                  </Link>
                </Box>
              </Box>
            </Paper>

            {/* App-Person */}
            <Paper elevation={1} sx={{
              ...commonCardStyle,
              borderLeft: `4px solid ${colors.person.border}`,
              '&:hover': {
                backgroundColor: colors.person.hover,
                transform: 'translateY(-5px)',
              },
            }}>
              <Box sx={apiContainerStyle}>
                <Chip
                  icon={<AccountCircleIcon />}
                  label="API Account"
                  size="small"
                  sx={apiChipStyle}
                />
                <Chip
                  icon={<PersonIcon />}
                  label="API Person"
                  size="small"
                  sx={apiChipStyle}
                />
              </Box>
              <Box sx={cardContentStyle}>
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#495057', mb: 1, fontSize: '1rem' }}>App Person</Typography>
                <Typography variant="body2" sx={{ color: '#6c757d', mb: 1, textAlign: 'center', fontSize: '0.75rem' }}>
                  Gerenciamento de Pessoas
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%', alignItems: 'center' }}>
                  <Link
                    href="https://d14t2a2k6rq4on.cloudfront.net/"
                    target="_blank"
                    sx={{
                      ...commonLinkStyle,
                      color: colors.person.border,
                      border: `1px solid ${colors.person.border}`,
                      '&:hover': {
                        backgroundColor: colors.person.hover,
                      }
                    }}
                  >
                    Cadastro
                  </Link>
                  <Link
                    href="https://d14t2a2k6rq4on.cloudfront.net/#/success"
                    target="_blank"
                    sx={{
                      ...commonLinkStyle,
                      color: colors.person.border,
                      border: `1px solid ${colors.person.border}`,
                      '&:hover': {
                        backgroundColor: colors.person.hover,
                      }
                    }}
                  >
                    Informações
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Descrição principal */}
        <Box sx={{
          display: 'flex',
          gap: 3,
          width: '100%',
          maxWidth: '1200px',
          flexDirection: isMobile ? 'column' : 'row',
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
        }}>
          {/* Box de APIs */}
          <Box sx={{
            flex: 1,
            margin: 0,
            padding: 0,
          }}>
            <Paper elevation={0} sx={{
              padding: 3,
              backgroundColor: '#ffffff',
              borderRadius: 0,
              border: '1px solid #e0e0e0',
              height: '100%',
              margin: 0,
              boxShadow: 'none',
            }}>
              <Typography variant="h5" sx={sectionTitleStyle}>
                APIs do Sistema
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}>
                <Box sx={apiBoxStyle}>
                  <AccountCircleIcon sx={{ color: colors.root.icon }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>API Account</Typography>
                </Box>
                <Box sx={apiBoxStyle}>
                  <SettingsIcon sx={{ color: colors.preference.icon }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>API Preference</Typography>
                </Box>
                <Box sx={apiBoxStyle}>
                  <StorageIcon sx={{ color: colors.profile.icon }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>API Profile</Typography>
                </Box>
                <Box sx={apiBoxStyle}>
                  <PersonIcon sx={{ color: colors.person.icon }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>API Person</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Box de Arquitetura */}
          <Box sx={{
            flex: 2,
            margin: 0,
            padding: 0,
          }}>
            <Paper elevation={0} sx={{
              padding: 3,
              backgroundColor: '#ffffff',
              borderRadius: 0,
              border: '1px solid #e0e0e0',
              height: '100%',
              margin: 0,
              boxShadow: 'none',
            }}>
              <Typography variant="h5" sx={sectionTitleStyle}>
                Arquitetura do Sistema
              </Typography>
              <Typography variant="body2" sx={descriptionTextStyle}>
                Esta aplicação é uma demonstração de microfrontends independentes, cada um com sua própria lógica de autenticação e APIs separadas,
                mantendo frontend e backend isolados por contexto de negócio.
              </Typography>
              
              <Box sx={backendBoxStyle}>
                <Typography variant="h6" sx={{ 
                  color: '#1a237e',
                  fontWeight: 600,
                  marginBottom: 1.5,
                  textAlign: 'center',
                  fontSize: '1rem',
                }}>
                  Backend
                </Typography>
                <Typography variant="body2" sx={descriptionTextStyle}>
                  O backend deste protótipo foi desenvolvido utilizando:
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  justifyContent: 'center', 
                  gap: 1.5, 
                  mt: 1.5 
                }}>
                  <Chip label="Quarkus" sx={techChipStyle} size="small" />
                  <Chip label="AWS Lambda" sx={techChipStyle} size="small" />
                  <Chip label="DynamoDB" sx={techChipStyle} size="small" />
                  <Chip label="OIDC" sx={techChipStyle} size="small" />
                  <Chip label="API Gateway" sx={techChipStyle} size="small" />
                </Box>
                <Typography variant="body2" sx={descriptionTextStyle}>
                  As APIs são expostas através de um API Gateway, permitindo acesso seguro e controlado aos microserviços.
                  A autenticação é gerenciada via OIDC, garantindo segurança e isolamento entre os diferentes contextos de negócio.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
