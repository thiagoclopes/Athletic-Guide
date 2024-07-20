import {Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import logo from "../assets/logo.png"
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

export function SideBar(){
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          position: 'fixed',
          height: '100%',
        },
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
        <img src={logo} alt="Logo" style={{ height: 80 }} />
      </div>
      <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ListItemButton sx={{ display: 'flex', alignItems: 'center', width: 'auto', marginBottom: 1 }}>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: 1 }}>
            <DirectionsRunOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Minha atividade" />
        </ListItemButton>
        <ListItemButton sx={{ display: 'flex', alignItems: 'center', width: 'auto', marginBottom: 1 }}>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: 1 }}>
            <RestaurantOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Plano alimentar" />
        </ListItemButton>
        <ListItemButton sx={{ display: 'flex', alignItems: 'center', width: 'auto', marginBottom: 1 }}>
          <ListItemText primary="Contact" />
        </ListItemButton>
        {/* Adicione mais itens de menu aqui */}
      </List>
    </Drawer>
  );
}