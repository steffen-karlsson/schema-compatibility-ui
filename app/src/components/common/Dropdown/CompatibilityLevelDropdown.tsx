import React from 'react';
import { CompatibilityLevel } from 'generated-sources';
import { SCHEMA_COMPATIBILITY_LEVEL } from 'storage/const';
import { updateLocalStorage } from 'storage/local';

import Dropdown from './Dropdown';

const CompatibilityLevelDropdown: React.FC = () => {
  const options = Object.keys(CompatibilityLevel).map((key) => ({
    value: key,
    label: key.toLowerCase(),
  }));

  if (!localStorage.getItem(SCHEMA_COMPATIBILITY_LEVEL)) {
    updateLocalStorage(SCHEMA_COMPATIBILITY_LEVEL, CompatibilityLevel.BACKWARD);
  }
  const [compatibilityLevel, setCompatibilityLevel] =
    React.useState<CompatibilityLevel>(
      localStorage.getItem(SCHEMA_COMPATIBILITY_LEVEL) as CompatibilityLevel
    );

  return (
    <Dropdown
      props={{ size: 'small' }}
      label="Compatibility Level"
      options={options}
      value={compatibilityLevel}
      onChange={(value: string) => {
        updateLocalStorage(SCHEMA_COMPATIBILITY_LEVEL, value);
        setCompatibilityLevel(value as CompatibilityLevel);
      }}
    />
  );
};

export default CompatibilityLevelDropdown;
