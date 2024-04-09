import React from 'react';
import { SchemaType } from 'generated-sources';

import Dropdown from './Dropdown';

const SchemaTypeDropdown: React.FC = () => {
  const options = Object.keys(SchemaType).map((key) => ({
    value: key,
    label: key.toLowerCase(),
  }));

  if (!localStorage.getItem('schemaType')) {
    localStorage.setItem('schemaType', SchemaType.AVRO);
  }

  const [schemaType, setSchemaType] = React.useState<SchemaType>(
    localStorage.getItem('schemaType') as SchemaType
  );

  return (
    <Dropdown
      props={{ size: 'small' }}
      label="Schema Type"
      options={options}
      value={schemaType}
      onChange={(value: string) => {
        localStorage.setItem('schemaType', value);
        setSchemaType(value as SchemaType);
      }}
    />
  );
};

export default SchemaTypeDropdown;
