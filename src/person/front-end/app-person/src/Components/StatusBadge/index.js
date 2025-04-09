import React from 'react';
import { Chip } from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  HourglassEmpty as HourglassEmptyIcon
} from '@mui/icons-material';
import StatusType from '../../constants/StatusType';

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case StatusType.APPROVED:
        return {
          label: 'Aprovado',
          color: 'success',
          icon: <CheckCircleIcon />
        };
      case StatusType.PENDING:
        return {
          label: 'Pendente',
          color: 'warning',
          icon: <PendingIcon />
        };
      case StatusType.INPROGRESS:
        return {
          label: 'Em Andamento',
          color: 'info',
          icon: <HourglassEmptyIcon />
        };
      default:
        return {
          label: 'Desconhecido',
          color: 'default',
          icon: null
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      label={config.label}
      color={config.color}
      icon={config.icon}
      sx={{ 
        fontWeight: 'bold',
        '& .MuiChip-icon': {
          color: 'inherit'
        }
      }}
    />
  );
};

export default StatusBadge; 