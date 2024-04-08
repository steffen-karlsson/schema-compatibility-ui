import React from 'react';
import { SchemaType } from 'generated-sources';

import Dropdown from './Dropdown';

const SchemaTypeDropdown: React.FC = () => {
  const options = Object.keys(SchemaType).map((key) => ({
    value: key,
    label: key.toLowerCase(),
  }));

  return (
    <Dropdown
      props={{ size: 'small' }}
      label="Schema Type"
      options={options}
      value={SchemaType.AVRO}
      onChange={(value: string) => {
        console.log(value);
      }}
    />
  );
};

export default SchemaTypeDropdown;
