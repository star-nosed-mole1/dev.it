import React from 'react';
import { AppBar, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import logo from '../assets/devit.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';


export function NavBar() {
  return (
    <AppBar
      sx={{
        width: '100%',
        height: '8%',
        backgroundColor: 'primary.light',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          padding: '0px',
          paddingLeft: '10px',
        }}
      >
        <img src={logo} width='100%' height='100%' />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button
            small
            sx={{
              height: '30%',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Quicksand',
                fontWeight: 600,
              }}
            >
              HOME
            </Typography>
          </Button>
        </Link>
        <IconButton
          sx={{
            margin: '0px',
          }}
        >
          <a href='https://github.com/star-nosed-mole1/dev.it' target='_blank'>
            <GitHubIcon></GitHubIcon>
          </a>
        </IconButton>
      </Box>
    </AppBar>
  );
}
