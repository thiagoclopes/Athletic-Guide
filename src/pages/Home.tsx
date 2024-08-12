import { useNavigate } from 'react-router-dom';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { LoginDialog } from '../components/login-dialog';
import { Button } from '@/components/ui/button';
import Bwlogo from "../assets/bw-logo.png"
import teste from "../assets/imagem-espelhada-horizontal.png"

export const Home = () => {
  const navigate = useNavigate();

  function handleNavigateToRegistration() {
    navigate('/registration');
  }

  return (
    <div className="bg-gradient-to-b from-black via-zinc-950 to-zinc-800">
      <div className="absolute right-0 z-0">
        <img src={ teste } className="h-full object-cover" style={{ maxHeight: '100vh' }}/>
      </div>
      <div className="absolute left-32 top-20 z-0">
        <img src={ Bwlogo } className="h-32 object-cover"/>
      </div>
      <div className="relative flex flex-col justify-center h-screen ml-[20vh] pt-[15vh] z-10">
        <h2 className="text-gray-50 text-5xl font-bebasNeue font-4xl">
          DESAFIE SEUS LIMITES
        </h2>
       
        <h2 className="text-gray-50 text-5xl font-bebasNeue font-4xl">
          E DESPERTE O CAMPEÃO dentro de você
        </h2>
          <p className="text-gray-400 mb-20">"Aqui, a excelência é um estilo de vida. Junte-se a nós e descubra o seu potencial máximo."</p>
          <div className="flex flex-col justify-center">
          <p className="text-gray-50 text-lg w-3/4 mb-4 ">
            Sua jornada para atingir o auge do desempenho começa agora. Registre seus dados e dê o primeiro passo rumo às suas melhores conquistas. Vamos juntos transformar seus objetivos em resultados extraordinários!
            <RocketLaunchOutlinedIcon className="text-gray-50 text-2xl ml-2"/>
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="lg" className="border-2 border-white rounded-lg group" variant="ghost" onClick={handleNavigateToRegistration}>
          <p className="text-zinc-300 font-bold group-hover:text-red-600">ALCANÇAR O TOPO</p>
          </Button>
          <LoginDialog />
        </div>
      </div>
    </div>
  );
};