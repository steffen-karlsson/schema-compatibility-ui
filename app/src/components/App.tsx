import React from 'react';

import AppToolbar from './common/Toolbar/AppToolbar';
import * as S from './App.styled';

const App: React.FC = () => {
  return (
    <S.ContainerWrapper maxWidth={false}>
      <AppToolbar />
    </S.ContainerWrapper>
  );
};

export default App;
