import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function FormDialog() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
        const response = await axios.get('http://localhost:3000/diets', {
            params: { email }
          });
          
            const diet = response.data[0];

            if (diet && diet.email === email) {
                console.log('Login bem-sucedido:', email);
                navigate(`/plano-alimentar?email=${encodeURIComponent(email)}`);
                handleClose();
            } else {
                console.error('Nenhuma dieta encontrada para o email fornecido');
            }
            } catch (error) {
            console.error('Erro ao fazer login:', error);
            }
        };


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Fazer login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Acesso ao plano </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite o seu email para acessar o seu progresso.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button type="submit">Entrar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
