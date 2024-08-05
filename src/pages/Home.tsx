import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { FormDialog } from '../components/login-dialog';

export const Home = () => {
  const navigate = useNavigate();

  function handleNavigateToRegistration() {
    navigate('/registration');
  }

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
      <Typography variant="h6" gutterBottom sx={{textAlign: 'center', width: '70%', marginBottom: '4vh'}}>
        Sua jornada para atingir o auge do desempenho começa agora. Registre seus dados e dê o primeiro passo rumo às suas melhores conquistas. Vamos juntos transformar seus objetivos em resultados extraordinários!
      </Typography>
      <Box sx={{display: 'flex', gap:2}}>
        <Button sx={{width: '20vw'}} variant="contained" color="primary" onClick={handleNavigateToRegistration}>
          Registrar Dados
        </Button>
        <FormDialog />
      </Box>

    </Box>
  );
};