import React from 'react';
import CompareRoundedIcon from '@mui/icons-material/CompareRounded';

import CompatibilityLevelDropdown from './common/Dropdown/CompatibilityLevelDropdown';
import SchemaTypeDropdown from './common/Dropdown/SchemaTypeDropdown';
import Editor from './common/Editor/Editor';
import AppToolbar, { ChildrenAlignment } from './common/Toolbar/AppToolbar';
import * as S from './App.styled';

const App: React.FC = () => {
  return (
    <S.ContainerWrapper maxWidth={false}>
      <AppToolbar
        title="Schema Compatibility UI"
        icon={<CompareRoundedIcon />}
        align={ChildrenAlignment.RIGHT}
        childrenGap={10}
      >
        <SchemaTypeDropdown />
        <CompatibilityLevelDropdown />
      </AppToolbar>
      <Editor />
    </S.ContainerWrapper>
  );
};

export default App;
