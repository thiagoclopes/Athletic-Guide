import axios from "axios";

export interface QuestionnaireData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  ageValue: number[];
  weight: string;
  height: number[];
  trainingGoal: string;
  activityLevel: string;
  medicalCondition: string;
  foodAllergy: string;
  trainingFrequency: string;
}

export interface ExerciseDataProps {
  nome?: string;
  email?: string;
  objetivo_treino: string;
  dias_por_semana: number;
  plano_exercicios: {
    dia: number;
    tipo_treino: string;
    exercicios: {
      nome: string;
      series: number;
      repeticoes: number;
      descanso_segundos: number;
    }[];
    aquecimento: string;
    alongamento: string;
  }[];
}

export async function createWorkoutPlan(data: QuestionnaireData) {
  const { name, email, ageValue, gender, weight, height, trainingGoal, activityLevel, medicalCondition, trainingFrequency } = data;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Você é um treinador pessoal.'
          },
          {
            role: 'user',
            content: `
              Preencha o JSON abaixo com um plano de exercícios personalizado para o seguinte indivíduo:
    
              Idade: ${ageValue}
              Sexo: ${gender}
              Peso: ${weight} kg
              Altura: ${height} cm
              Objetivo de treinamento: ${trainingGoal}
              Nível de Atividade Física: ${activityLevel}
              Frequência e duração de treinos: ${trainingFrequency}
              Limitações ou lesões?: ${medicalCondition}
    
              JSON:
              {
                "objetivo_treino": "",
                "dias_por_semana": 0,
                "plano_exercicios": [
                  {
                    "dia": 1,
                    "tipo_treino": "",
                    "exercicios": [
                      {
                        "nome": "",
                        "series": 0,
                        "repeticoes": 0,
                        "descanso_segundos": 0
                      }
                    ],
                    "aquecimento": "",
                    "alongamento": ""
                  }
                  // Continue para outros dias de treino...
                ]
              }
              
              Para cada exercício, inclua: nome, número de séries, número de repetições, e tempo de descanso em segundos. Inclua também aquecimento e alongamento recomendados para cada dia de treino. Alinhe o plano com o objetivo de treinamento e as limitações informadas.
              
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

    const workoutPlan: ExerciseDataProps = JSON.parse(response.data.choices[0].message.content);
    workoutPlan.email = email;
    workoutPlan.nome = name;
    console.log(workoutPlan);

    if (!workoutPlan) {
      throw new Error('Resposta inválida da API');
    }
    return workoutPlan;
    
  } catch (err) {
    console.log(err);
  }
}
