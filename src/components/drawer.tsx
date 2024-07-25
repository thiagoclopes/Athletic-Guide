import {Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Toolbar } from '@mui/material';
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
    
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          height: '100%',
        },
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
        <img src={logo} alt="Logo" style={{ height: 80 }} />
      </div>
      <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <ListItemButton sx={{ display: 'flex', alignItems: 'center', width: '80%', marginBottom: 1 }} onClick={handleNavigateToDashboard}>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: 1 }}>
            <AssessmentOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton sx={{ display: 'flex', alignItems: 'center', width: '80%', marginBottom: 1 }} onClick={handleNavigateToActivity}>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: 1 }}>
            <DirectionsRunOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Minha atividade" />
        </ListItemButton>
        <ListItemButton sx={{ display: 'flex', alignItems: 'center', width: '80%', marginBottom: 1 }} onClick={handleNavigateToPlan}>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: 1 }}>
            <RestaurantOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Plano alimentar" />
        </ListItemButton>
        <ListItemButton sx={{ display: 'flex', alignItems: 'center', width: '80%', marginBottom: 1 }} onClick={handleNavigateToContact}>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: 1 }}>
            <CallIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemButton>
        {/* Adicione mais itens de menu aqui */}
      </List>
    </Drawer>
  );
}