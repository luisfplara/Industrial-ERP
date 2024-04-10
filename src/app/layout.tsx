'use client'
import * as React from 'react';
import theme from '@/theme';

import { Link, Typography, useMediaQuery } from '@mui/material';

const drawerWidth = 256;



export default function RootLayout(props: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <html lang="en">
      <body>
          {props.children}
      </body>
    </html>
  );
}


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}