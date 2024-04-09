import React from 'react';
import { CompatibilityLevel } from 'generated-sources';

import Dropdown from './Dropdown';

const CompatibilityLevelDropdown: React.FC = () => {
  const options = Object.keys(CompatibilityLevel).map((key) => ({
    value: key,
    label: key.toLowerCase(),
  }));

  if (!localStorage.getItem('compatibilityLevel')) {
    localStorage.setItem('compatibilityLevel', CompatibilityLevel.BACKWARD);
  }
  const [compatibilityLevel, setCompatibilityLevel] =
    React.useState<CompatibilityLevel>(
      localStorage.getItem('compatibilityLevel') as CompatibilityLevel
    );

  return (
    <Dropdown
      props={{ size: 'small' }}
      label="Compatibility Level"
      options={options}
      value={compatibilityLevel}
      onChange={(value: string) => {
        localStorage.setItem('compatibilityLevel', value);
        setCompatibilityLevel(value as CompatibilityLevel);
      }}
    />
  );
};

export default CompatibilityLevelDropdown;
