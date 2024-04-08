import React from 'react';
import { CompatibilityLevel } from 'generated-sources';

import Dropdown from './Dropdown';

const CompatibilityLevelDropdown: React.FC = () => {
  const options = Object.keys(CompatibilityLevel).map((key) => ({
    value: key,
    label: key.toLowerCase(),
  }));

  return (
    <Dropdown
      props={{ size: 'small' }}
      label="Compatibility Level"
      options={options}
      value={CompatibilityLevel.BACKWARD}
      onChange={(value: string) => {
        console.log(value);
      }}
    />
  );
};

export default CompatibilityLevelDropdown;
