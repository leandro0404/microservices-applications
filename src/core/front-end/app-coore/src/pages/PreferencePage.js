// src/pages/PreferencePage.js
import React, { Suspense } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import EditPreferences from 'app_preference/EditPreferences'

const PreferencePage = () => {

  return (
    <Box>

      {/* Carregar o componente EditPreferences passando o token e accountId */}
      <Suspense fallback={<CircularProgress />}>
        <EditPreferences/>
      </Suspense>
    </Box>
  );
};

export default PreferencePage;
