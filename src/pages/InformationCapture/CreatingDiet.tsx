import axios from "axios";

export interface QuestionnaireData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  ageValue: string;
  weight: string;
  height: string;
  trainingGoal: string;
  activityLevel: string;
  medicalCondition: string;
  foodAllergy: string;
  trainingFrequency: string;
  }

export type RefeicaoTipo = 'cafe_da_manha' | 'lanche_da_manha' | 'almoco' | 'lanche_da_tarde' | 'jantar' | 'ceia';

export interface DietDataProps {
  id?: string;
  nome?: string;
  email?: string;
  objetivo_calorico: string;
  necessidades_caloricas_diarias_para_objetivo: number;
  plano_de_refeicoes_diarias: {
    total_de_refeicoes: number;
    calorias_por_refeicao: number;
  };
  necessidades_diarias_de_macronutrientes: {
    proteinas: number;
    carboidratos: number;
    gorduras: number;
  };
  exemplo_de_plano_de_refeicoes: {
    [key in RefeicaoTipo]: {
      alimentos: {
        nome: string;
        quantidade: number;
        proteina: number;
        carboidrato: number;
        gordura: number;
      }[];
    };
  };
}


  
  
  export async function createDiet(data: QuestionnaireData) {
    const { name, email, ageValue, gender, weight, height, trainingGoal, activityLevel, medicalCondition, foodAllergy, trainingFrequency } = data;
    const imc = Number(weight) / ((Number(height) / 100) ** 2);
    const tmb = Number(88.362 + (13.397 * Number(weight)) + (4.799 * Number(height)) - (5.677 * Number(ageValue)))
    
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
  
                  Idade: ${ageValue}
                  Sexo: ${gender}
                  Peso: ${weight} kg
                  Altura: ${height} cm
                  Taxa Metabólica Basal: ${tmb}
                  Índice de massa corporal: ${imc}
                  Objetivo de treinamento: ${trainingGoal}
                  Nível de Atividade Física: ${activityLevel}
                  Condição de Saúde?: ${medicalCondition}
                  Alergia?: ${foodAllergy}
                  Frequência e duração de treinos: ${trainingFrequency}
  
                  JSON:
                  {
                    "objetivo_calorico": "",
                    "necessidades_caloricas_diarias_para_objetivo": 0,
                    "plano_de_refeicoes_diarias": {
                        "total_de_refeicoes": 0,
                        "calorias_por_refeicao": 0
                    },
                    "necessidades_diarias_de_macronutrientes": {
                        "proteinas": "",
                        "carboidratos": "",
                        "gorduras": ""
                    },
                    "exemplo_de_plano_de_refeicoes": {
                        "cafe_da_manha": {
                            "alimentos": []
                        },
                        "lanche_da_manha": {
                            "alimentos": []
                        },
                        "almoco": {
                            "alimentos": []
                        },
                        "lanche_da_tarde": {
                            "alimentos": []
                        },
                        "jantar": {
                            "alimentos": []
                        },
                        "ceia": {
                            "alimentos": []
                        }
                    }
                  }
                  Preencha as refeições (cafe_da_manha, lanche_da_manha, almoco, lanche_da_tarde, jantar, ceia) com alimentos que atendam às necessidades diárias de proteínas, carboidratos e gorduras.
                  Inclua no JSON para cada alimento: nome, quantidade(em gramas ou unidades, especifique a unidade. Exemplo: 25g, 2 Unidades), proteina, carboidrato, e gordura.
                  As quantidades e a composição dos alimentos devem alinhar-se com os valores recomendados de macronutrientes calculados anteriormente.
                  Especifique quando necessário a preparação do alimento, exemplo: (Ovo cozido, Ovo frito)
  
                  A resposta deve ser apenas o JSON, sem nenhum texto adicional nem acento grave envolvendo-o.
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
        const diet: DietDataProps = JSON.parse(response.data.choices[0].message.content);
        console.log(diet);
        diet.email = email
        diet.nome = name
        console.log(diet)

        if (!diet) {
            throw new Error('Resposta inválida da API');
        }

        return diet;
      } catch (err) {
        console.log(err)
      }
      
  }