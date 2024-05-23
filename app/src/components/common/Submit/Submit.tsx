import React, { useEffect } from 'react';
import { Check } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  SCHEMA_COMPATIBILITY_LEVEL,
  SCHEMA_EXISTING,
  SCHEMA_PROPOSED,
  SCHEMA_TYPE,
} from 'storage/const';

export interface SubmitProps {
  onValidateClick: () => boolean;
}

const Submit: React.FC<SubmitProps> = ({ onValidateClick }) => {
  const getDisabled = () => {
    return (
      !localStorage.getItem(SCHEMA_COMPATIBILITY_LEVEL) ||
      !localStorage.getItem(SCHEMA_TYPE) ||
      !localStorage.getItem(SCHEMA_EXISTING) ||
      !localStorage.getItem(SCHEMA_PROPOSED)
    );
  };

  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(getDisabled());

  useEffect(() => {
    window.addEventListener('storage', () => {
      setDisabled(getDisabled());
    });
  }, []);

  const onClick = () => {
    setLoading(true);
    if (onValidateClick()) {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      disabled={disabled}
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
