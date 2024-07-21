import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

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
      <Typography variant="h2" gutterBottom sx={{textAlign: 'center', paddingLeft: '81px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        Bem-vindo ao Athletic Guide!
        <RocketLaunchOutlinedIcon sx={{ fontSize: 'inherit', marginLeft: '8px' }}/>
      </Typography>
      <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>
        Sua jornada para atingir o auge do desempenho começa agora. Registre seus dados e dê o primeiro passo rumo às suas melhores conquistas. Vamos juntos transformar seus objetivos em resultados extraordinários!
      </Typography>
      <Link to="/registration" style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="primary">
        Registrar Dados
      </Button>
      </Link>
    </Box>
  );
};