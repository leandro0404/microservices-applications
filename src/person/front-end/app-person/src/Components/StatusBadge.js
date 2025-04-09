import React from 'react';
import { 
  Box, 
  Chip, 
  Typography 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import StatusType from '../constants/StatusType';

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case StatusType.APPROVED:
        return 'success';
      case StatusType.PENDING:
        return 'warning';
      case StatusType.INPROGRESS:
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case StatusType.APPROVED:
        return <CheckCircleIcon />;
      case StatusType.PENDING:
        return <PendingIcon />;
      case StatusType.INPROGRESS:
        return <HourglassEmptyIcon />;
      default:
        return null;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case StatusType.APPROVED:
        return 'Aprovado';
      case StatusType.PENDING:
        return 'Pendente';
      case StatusType.INPROGRESS:
        return 'Em Andamento';
      default:
        return status;
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mr: 1 }}>
        Status:
      </Typography>
      <Chip
        icon={getStatusIcon()}
        label={getStatusLabel()}
        color={getStatusColor()}
        variant="outlined"
        sx={{ fontWeight: 'bold' }}
      />
    </Box>
  );
};

export default StatusBadge; 