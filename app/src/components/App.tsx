import React, { useEffect, useRef } from 'react';
import CompareRoundedIcon from '@mui/icons-material/CompareRounded';

import CompatibilityLevelDropdown from './common/Dropdown/CompatibilityLevelDropdown';
import SchemaTypeDropdown from './common/Dropdown/SchemaTypeDropdown';
import Editor from './common/Editor/Editor';
import Submit from './common/Submit/Submit';
import AppToolbar, { ChildrenAlignment } from './common/Toolbar/AppToolbar';
import useWindowDimensions from './hooks/window-dimensions';
import * as S from './App.styled';

const App: React.FC = () => {
  const { height: vh, width: vw } = useWindowDimensions();

  const toolbarRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLDivElement>(null);

  const [contentHeight, setContentHeight] = React.useState(0);
  const [editorHeight, setEditorHeight] = React.useState(0);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (toolbar) {
      setContentHeight(vh - toolbar.offsetHeight);
    }
  }, [vh, vw, toolbarRef]);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const submit = submitRef.current;
    if (toolbar && submit) {
      const style = window.getComputedStyle(submit);
      setEditorHeight(
        vh -
          toolbar.offsetHeight -
          submit.offsetHeight -
          parseInt(style.marginBottom, 10)
      );
    }
  }, [vh, vw, toolbarRef, submitRef]);

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
      <S.ContentWrapper $height={contentHeight}>
        <Editor height={editorHeight} />
        <S.SubmitWrapper ref={submitRef}>
          <Submit />
        </S.SubmitWrapper>
      </S.ContentWrapper>
    </S.ContainerWrapper>
  );
};

export default App;
