import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Sidebar } from '../components/sidebar/Sidebar';
import {Header} from '../components/header/Header'

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

const AuthLayout = (props: AuthLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header onSidebarOpen={() => setSidebarOpen(true)}/>
      <LayoutRoot>
        <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            {props.children}
        </Box>
      </LayoutRoot> 
      <Sidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

export default AuthLayout;
