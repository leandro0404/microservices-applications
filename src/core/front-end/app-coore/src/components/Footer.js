import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box 
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#f1f1f1',
        textAlign: 'center',
        padding: '10px 0',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Criado por{' '}
        <Link href="https://github.com/leandro0404" target="_blank" rel="noopener noreferrer">
          Leandro Silveira
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
