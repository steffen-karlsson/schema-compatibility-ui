import React from 'react';

import CompatibilityLevelDropdown from './common/Dropdown/CompatibilityLevelDropdown';
import SchemaTypeDropdown from './common/Dropdown/SchemaTypeDropdown';
import AppToolbar, { ChildrenAlignment } from './common/Toolbar/AppToolbar';
import * as S from './App.styled';

const App: React.FC = () => {
  return (
    <S.ContainerWrapper maxWidth={false}>
      <AppToolbar align={ChildrenAlignment.RIGHT} childrenGap={10}>
        <SchemaTypeDropdown />
        <CompatibilityLevelDropdown />
      </AppToolbar>
    </S.ContainerWrapper>
  );
};

export default App;
