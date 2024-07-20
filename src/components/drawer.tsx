import {Box, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import logo from "../assets/logo.png"
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

export function SideBar(){
    return (
        <>
        <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
          <img
            src={logo}
            alt="Logo"
            style={{
            maxWidth: '60%',
            height: 'auto',
            marginTop: 20
          }}
          />
        </Box>
        <Box sx={{ width: '100%', flexGrow: 1 }}>
            <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ListItemButton sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                <DirectionsRunOutlinedIcon sx={{  width: 24, height: 24, marginRight: 1 }}/>
                <ListItemText primary="Minha atividade" />
            </ListItemButton>
            <ListItemButton sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                <RestaurantOutlinedIcon sx={{  width: 20, height: 20, marginRight: 1 }}/>
                <ListItemText primary="Plano alimentar" />
            </ListItemButton>
            <ListItemButton sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                <ListItemText primary="Contact" />
            </ListItemButton>
            {/* Adicione mais itens de menu aqui */}
            </List>
        </Box>
      </Drawer>
      </>
    )
}