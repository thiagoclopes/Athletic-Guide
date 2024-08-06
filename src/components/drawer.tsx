import logo from "../assets/logo.png"
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import CallIcon from '@mui/icons-material/Call';
import { useNavigate } from 'react-router-dom';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

export function SideBar(){
  const navigate = useNavigate();
  const handleNavigateToPlan = () => {
      navigate('/plano-alimentar');
  };
  const handleNavigateToActivity = () => {
    navigate('/minha-atividade');  
  };
  const handleNavigateToContact = () => {
    navigate('/contato');
  };
  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="w-60 h-full bg-slate-800 text-white flex flex-col rounded-lg shadow-lg overflow-hidden m-2">
      <div className="flex justify-center items-center py-5">
        <img src={logo} alt="Logo" className="h-20" />
      </div>
      <nav className="flex flex-col items-center">
        <button
          className="flex items-center w-4/5 py-2 px-4 hover:bg-gray-700 focus:outline-none"
          onClick={handleNavigateToDashboard}
        >
          <AssessmentOutlinedIcon className="w-6 h-6 mr-3" />
          <span>Dashboard</span>
        </button>
        <button
          className="flex items-center w-4/5 py-2 px-4 hover:bg-gray-700 focus:outline-none"
          onClick={handleNavigateToActivity}
        >
          <DirectionsRunOutlinedIcon className="w-6 h-6 mr-3" />
          <span>Minha atividade</span>
        </button>
        <button
          className="flex items-center w-4/5 py-2 px-4 hover:bg-gray-700 focus:outline-none"
          onClick={handleNavigateToPlan}
        >
          <RestaurantOutlinedIcon  className="w-6 h-6 mr-3" />
          <span>Plano alimentar</span>
        </button>
        <button
          className="flex items-center w-4/5 py-2 px-4 hover:bg-gray-700 focus:outline-none"
          onClick={handleNavigateToContact}
        >
          <CallIcon  className="w-6 h-6 mr-3" />
          <span>Contact</span>
        </button>
      </nav>
    </div>
  );
}