import React, { useEffect, useRef } from 'react';
import CompareRoundedIcon from '@mui/icons-material/CompareRounded';

import CompatibilityLevelDropdown from './common/Dropdown/CompatibilityLevelDropdown';
import SchemaTypeDropdown from './common/Dropdown/SchemaTypeDropdown';
import Editor from './common/Editor/Editor';
import useWindowDimensions from './common/hooks/window-dimensions';
import AppToolbar, { ChildrenAlignment } from './common/Toolbar/AppToolbar';
import * as S from './App.styled';

const App: React.FC = () => {
  const { height: vh, width: vw } = useWindowDimensions();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  useEffect(() => {
    if (toolbarRef.current) {
      setHeight(vh - toolbarRef.current.clientHeight);
    }
  }, [vh, vw, toolbarRef]);

  return (
    <S.ContainerWrapper maxWidth={false}>
      <AppToolbar
        ref={toolbarRef}
        title="Schema Compatibility UI"
        icon={<CompareRoundedIcon />}
        align={ChildrenAlignment.RIGHT}
        childrenGap={10}
      >
        <SchemaTypeDropdown />
        <CompatibilityLevelDropdown />
      </AppToolbar>
      <S.ContentWrapper $height={height}>
        <Editor />
      </S.ContentWrapper>
    </S.ContainerWrapper>
  );
};

export default App;
