import React from 'react';
import Check from '@mui/icons-material/Check';
import { Fab } from '@mui/material';

const Submit: React.FC = () => {
  return (
    <Fab size="medium" variant="extended" color="success">
      <Check />
      Validate
    </Fab>
  );
};

export default Submit;
