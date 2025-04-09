// src/pages/PersonPage.js
import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import PersonWizard from 'app_person/PersonWizard';
import { useAccount } from '../contexts/AccountContext';

const PersonPage = () => {
  const { account } = useAccount();
  
  const handleComplete = (personData) => {
    console.log('Person data updated:', personData);
  };

  return (
    <Box>
      <Suspense fallback={<CircularProgress />}>
        <PersonWizard 
          token={account?.token} 
          onComplete={handleComplete} 
        />
      </Suspense>
    </Box>
  );
};

export default PersonPage;
