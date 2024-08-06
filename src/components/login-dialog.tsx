import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

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
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" onClick={handleClickOpen}>
                  Fazer login
                </Button>
              </DialogTrigger>
      
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Acesso ao plano</DialogTitle>
                  <DialogDescription>
                    Digite o seu email para acessar o seu progresso.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="col-span-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
      
                  <DialogFooter>
                    <Button type="button" onClick={handleClose}>
                      Fechar
                    </Button>
                    <Button type="submit">
                      Entrar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        );
}
