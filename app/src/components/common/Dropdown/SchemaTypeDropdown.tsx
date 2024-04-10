import React from 'react';
import { SchemaType } from 'generated-sources';
import { SCHEMA_TYPE } from 'storage/const';
import { updateLocalStorage } from 'storage/local';

import Dropdown from './Dropdown';

const SchemaTypeDropdown: React.FC = () => {
  const options = Object.keys(SchemaType).map((key) => ({
    value: key,
    label: key.toLowerCase(),
  }));

  if (!localStorage.getItem(SCHEMA_TYPE)) {
    updateLocalStorage(SCHEMA_TYPE, SchemaType.AVRO);
  }

  const [schemaType, setSchemaType] = React.useState<SchemaType>(
    localStorage.getItem(SCHEMA_TYPE) as SchemaType
  );

  return (
    <Dropdown
      props={{ size: 'small' }}
      label="Schema Type"
      options={options}
      value={schemaType}
      onChange={(value: string) => {
        updateLocalStorage(SCHEMA_TYPE, value);
        setSchemaType(value as SchemaType);
      }}
    />
  );
};

export default SchemaTypeDropdown;
