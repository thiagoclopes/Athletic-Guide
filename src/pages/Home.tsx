import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Guia de Dieta para Atletas
      </Typography>
      <Typography variant="h6" gutterBottom>
        Clique no botão abaixo para criar uma nova dieta personalizada:
      </Typography>
      <Link to="/create-diet" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Criar Dieta
        </Button>
      </Link>
    </Box>
  );
};