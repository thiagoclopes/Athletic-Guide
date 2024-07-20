import { AppBar, Toolbar, Typography } from "@mui/material"


export function Header() {
    return (
      <AppBar position="fixed" sx={{ width: `calc(100% - 240px)`, marginLeft: 240 , backgroundColor: '#ffffff', color: '#000000'}}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Typography variant="h6" color="inherit" >
            Athletic Guide
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
  