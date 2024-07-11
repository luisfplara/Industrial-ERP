'use client'
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';

import { Box, Container, Link, Typography, useMediaQuery } from '@mui/material';
import Navigator from '@/components/Navigator';

import Header from '@/components/Header';

const drawerWidth = 256;



export default function RootLayout(props: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (

 
        <Box sx={{ display: 'flex', minHeight: '100vh'}} >
          <CssBaseline />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {isSmUp ? null : (
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            )}
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              sx={{ display: { sm: 'block', xs: 'none' } }}
            />
          </Box>
          <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', backgroundColor:'red'  }}>
            <Header onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flex: 1, minHeight: '100vh', py: 2, px: 4, bgcolor: '#eaeff1' }}>
              {props.children}
            </Box>

          </Box>
        </Box>



  );
}

