import { useState } from "react";
import { TextField, MenuItem, Button, Grid, Box, Typography } from '@mui/material';
import axios from "axios";

interface UserInfo {
    age: number;
    gender: string;
    weight: number;
    height: number;
    activity_level: string;
    food_preferences: string;
    dietary_restrictions: string;
    diet_goal: string;
  }

interface DietDataProps {
  objetivo_da_dieta: string,
  calorias_diarias: string,
  refeicoes: {
    cafe_da_manha: string[],
    lanche_da_manha: string[],
    almoco: string[],
    lanche_da_tarde: string[],
    jantar: string[],
    ceia: string[],
  }
  dicas_adicionais: string[],
  observacoes_importantes: string[],
}

  export function InputForm() {
  const [dietJson, setDietJson] = useState<string>('');
  const [dietData, setDietData] = useState<DietDataProps | null>(null);
  const [error, setError] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo>({
      age: 21,
      gender: 'Masculino',
      weight: 60,
      height: 170,
      activity_level: 'Moderado',
      food_preferences: 'Não come frutas e verduras',
      dietary_restrictions: 'Nenhuma',
      diet_goal: 'Ganhar massa muscular',
    });
  
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const { name, value } = e.target;
      setUserInfo(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'Você é um nutricionista.'
              },
              {
                role: 'user',
                content: `
                  Preencha o JSON abaixo com uma dieta personalizada para o seguinte indivíduo:
  
                  Idade: ${userInfo.age}
                  Sexo: ${userInfo.gender}
                  Peso: ${userInfo.weight} kg
                  Altura: ${userInfo.height} cm
                  Nível de Atividade Física: ${userInfo.activity_level}
                  Preferências Alimentares: ${userInfo.food_preferences}
                  Restrições Alimentares: ${userInfo.dietary_restrictions}
                  Objetivo da dieta: ${userInfo.diet_goal}
  
                  JSON:
                  {
                    "objetivo_da_dieta": "",
                    "calorias_diarias": "",
                    "refeicoes": {
                      "cafe_da_manha": [],
                      "lanche_da_manha": [],
                      "almoco": [],
                      "lanche_da_tarde": [],
                      "jantar": [],
                      "ceia": []
                    },
                    "dicas_adicionais": [],
                    "observacoes_importantes": []
                  }
  
                  A resposta deve ser apenas o JSON, sem nenhum texto adicional.
                `
              }
            ],
          },
          {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setDietJson(response.data.choices[0].message.content);
        setError(null);
        const parsedData: DietDataProps = JSON.parse(response.data.choices[0].message.content);
        setDietData(parsedData);
      } catch (err) {
        if (err instanceof Error) {
          setError('Erro ao enviar dados: ' + err.message);
          console.log(err)
        } else {
          setError('Erro desconhecido');
        }
        setDietJson('');
        setDietData(null);
      }
    };
  
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Typography variant="h6" gutterBottom>Informações do Usuário</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Idade"
              type="number"
              name="age"
              value={userInfo.age}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sexo"
              name="gender"
              value={userInfo.gender}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              select
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Peso (kg)"
              type="number"
              name="weight"
              value={userInfo.weight}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Altura (cm)"
              type="number"
              name="height"
              value={userInfo.height}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nível de Atividade Física"
              name="activity_level"
              value={userInfo.activity_level}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              select
            >
              <MenuItem value="Baixo">Baixo</MenuItem>
              <MenuItem value="Moderado">Moderado</MenuItem>
              <MenuItem value="Alto">Alto</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Preferências Alimentares"
              name="food_preferences"
              value={userInfo.food_preferences}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Restrições Alimentares"
              name="dietary_restrictions"
              value={userInfo.dietary_restrictions}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Objetivo da Dieta"
              name="diet_goal"
              value={userInfo.diet_goal}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Enviar Dados</Button>
          </Grid>
        </Grid>
        {dietData && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>Dados da Dieta</Typography>
          <ul>
            <li><strong>Objetivo da dieta:</strong> {dietData.objetivo_da_dieta}</li>
            <li><strong>Calorias diárias:</strong> {dietData.calorias_diarias}</li>
            <li><strong>Café da manhã:</strong> {dietData.refeicoes.cafe_da_manha.join(', ')}</li>
            <li><strong>Lanche da manhã:</strong> {dietData.refeicoes.lanche_da_manha.join(', ')}</li>
            <li><strong>Almoço:</strong> {dietData.refeicoes.almoco.join(', ')}</li>
            <li><strong>Lanche da tarde:</strong> {dietData.refeicoes.lanche_da_tarde.join(', ')}</li>
            <li><strong>Jantar:</strong> {dietData.refeicoes.jantar.join(', ')}</li>
            <li><strong>Ceia:</strong> {dietData.refeicoes.ceia.join(', ')}</li>
            <li><strong>Dicas adicionais:</strong> {dietData.dicas_adicionais.join(', ')}</li>
            <li><strong>Observações importantes:</strong> {dietData.observacoes_importantes.join(', ')}</li>
          </ul>
        </Box>
      )}
      </Box>
    );
  }