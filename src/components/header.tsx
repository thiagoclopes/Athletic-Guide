import { AppBar, Toolbar, Typography } from "@mui/material"


export function Header() {
    return (
      <AppBar sx={{ width: `calc(100% - 240px)`, backgroundColor: '#ffffff', color: '#000000'}}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Typography variant="h6" color="inherit" >
            Athletic Guide
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
  