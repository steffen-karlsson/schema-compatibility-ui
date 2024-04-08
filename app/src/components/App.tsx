import React from 'react';
import { Container } from '@mui/material';

import AppToolbar from './common/Toolbar/AppToolbar';

const App: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        padding: '0px !important',
      }}
    >
      <AppToolbar />
    </Container>
  );
};

export default App;
