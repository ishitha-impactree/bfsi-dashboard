import React from 'react';
import { FiTool } from 'react-icons/fi'; 
import { 
  Box, 
  Typography, 
  Container, 
  useTheme,
  useMediaQuery 
} from '@mui/material'; 

const UnderDevelopment: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: theme.spacing(4)
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isMobile ? 80 : 100,
          height: isMobile ? 80 : 100,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.main,
          marginBottom: theme.spacing(4),
          animation: 'pulse 2s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1
            },
            '50%': {
              transform: 'scale(1.05)',
              opacity: 0.8
            },
            '100%': {
              transform: 'scale(1)',
              opacity: 1
            }
          }
        }}
      >
        <FiTool 
          size={isMobile ? 40 : 50} 
          style={{ 
            strokeWidth: 1.5 
          }} 
        />
      </Box>
      <Typography 
        variant="h4" 
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          marginBottom: theme.spacing(2),
          fontSize: {
            xs: '1.75rem',
            sm: '2.125rem',
            md: '2.5rem'
          }
        }}
      >
        Under Development
      </Typography>

      <Typography 
        variant="h6" 
        component="p"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: 400,
          lineHeight: 1.6,
          maxWidth: '500px',
          fontSize: {
            xs: '1rem',
            sm: '1.25rem'
          }
        }}
      >
        This page is currently in progress. Please check back later!
      </Typography>

      <Box
        sx={{
          width: '200px',
          height: '4px',
          backgroundColor: theme.palette.grey[200],
          borderRadius: '2px',
          marginTop: theme.spacing(4),
          overflow: 'hidden',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '60%',
            backgroundColor: theme.palette.primary.main,
            animation: 'progress 2s infinite ease-in-out',
            '@keyframes progress': {
              '0%': {
                transform: 'translateX(-100%)'
              },
              '100%': {
                transform: 'translateX(250%)'
              }
            }
          }
        }}
      />
    </Container>
  );
};

export default UnderDevelopment;