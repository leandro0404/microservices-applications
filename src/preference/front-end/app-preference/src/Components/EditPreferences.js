import React from 'react';
import { 
  Button, 
  CircularProgress, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Snackbar, 
  Box, 
  Grid,
  Alert,
  Typography
} from '@mui/material'; 
import { usePreferences } from '../hooks/usePreferences';
import { LOCALE_OPTIONS, TIMEZONE_OPTIONS } from '../constants/preferences';
import { AccountProvider } from '../contexts/AccountContext';

const PreferenceSelect = ({ label, value, options, onChange }) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel shrink>{label}</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label={label}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const EditPreferencesContent = ({ onPreferenceUpdated }) => {
  const {
    preferences,
    loading,
    saving,
    error,
    success,
    savePreferences,
    updatePreference,
    setSuccess,
  } = usePreferences();

  const handleSave = async () => {
    await savePreferences();
    if (onPreferenceUpdated) {
      onPreferenceUpdated(preferences);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Editar Preferências
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <PreferenceSelect
            label="Idioma"
            value={preferences.locale}
            options={LOCALE_OPTIONS}
            onChange={(value) => updatePreference('locale', value)}
          />

          <PreferenceSelect
            label="Fuso Horário"
            value={preferences.timezone}
            options={TIMEZONE_OPTIONS}
            onChange={(value) => updatePreference('timezone', value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving}
            sx={{ mt: 2 }}
          >
            {saving ? <CircularProgress size={24} /> : 'Salvar'}
          </Button>
        </Box>

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Preferências salvas com sucesso!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

// Wrapper component that provides the AccountContext
const EditPreferences = ({ token, ...props }) => {
  // Se já existe um token global, use-o
  const effectiveToken = token || window.appPreferenceToken;

  return (
    <AccountProvider externalToken={effectiveToken}>
      <EditPreferencesContent {...props} />
    </AccountProvider>
  );
};

export default EditPreferences;
