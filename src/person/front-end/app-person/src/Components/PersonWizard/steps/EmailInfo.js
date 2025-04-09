import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Grid,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EmailInfo = ({ onComplete, initialValue, readOnly = false }) => {
  const [emails, setEmails] = useState(initialValue?.emails || []);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    if (emails.length > 0) {
      onComplete({ emails });
    }
  }, [emails, onComplete]);

  const handleAddEmail = () => {
    if (readOnly) return;
    if (newEmail.trim() && isValidEmail(newEmail.trim())) {
      setEmails([...emails, newEmail.trim()]);
      setNewEmail('');
    }
  };

  const handleRemoveEmail = (index) => {
    if (readOnly) return;
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddEmail();
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Informações de Email
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Novo Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={readOnly}
            helperText="Digite o email e pressione Enter para adicionar"
            error={newEmail !== '' && !isValidEmail(newEmail)}
          />
        </Grid>
        
        <Grid item xs={12}>
          <List>
            {emails.map((email, index) => (
              <ListItem key={index}>
                <ListItemText primary={email} />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={() => handleRemoveEmail(index)}
                    disabled={readOnly}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailInfo; 