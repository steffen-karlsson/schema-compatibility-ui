import React from 'react';
import { Check } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

const Submit: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const onClick = () => {
    setLoading(true);
  };

  return (
    <LoadingButton
      size="large"
      color="success"
      loading={loading}
      loadingPosition="start"
      startIcon={<Check />}
      variant="outlined"
      onClick={onClick}
    >
      Validate
    </LoadingButton>
  );
};

export default Submit;
