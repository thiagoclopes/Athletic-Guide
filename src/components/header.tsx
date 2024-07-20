import { AppBar, IconButton, Toolbar } from "@mui/material"

import MenuIcon from '@mui/icons-material/Menu';

export function Header() {
    return (
      <>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ position: 'absolute', left: 20 }}>
             <MenuIcon />
            </IconButton>
            
          </Toolbar>
        </AppBar>
        
      </>
    )
  }
  