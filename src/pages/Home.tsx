import { useNavigate } from 'react-router-dom';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { LoginDialog } from '../components/login-dialog';
import { Button } from '@/components/ui/button';

export const Home = () => {
  const navigate = useNavigate();

  function handleNavigateToRegistration() {
    navigate('/registration');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2">
      <h2 className="text-4xl font-bold text-center flex items-center justify-center mb-8">
        Bem-vindo ao Athletic Guide!
        <RocketLaunchOutlinedIcon style={{ fontSize: 'inherit', marginLeft: '8px' }} />
      </h2>
      <p className="text-lg text-center w-3/4 mb-4">
        Sua jornada para atingir o auge do desempenho começa agora. Registre seus dados e dê o primeiro passo rumo às suas melhores conquistas. Vamos juntos transformar seus objetivos em resultados extraordinários!
      </p>
      <div className="flex gap-2">
        <Button size="lg" variant="customDarkBlue" onClick={handleNavigateToRegistration}>
          Registrar Dados
        </Button>
        <LoginDialog />
      </div>
    </div>
  );
};