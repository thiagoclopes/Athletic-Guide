import axios from "axios";

export interface QuestionnaireData {
    name: string;
    email: string;
    age: number;
    gender: string;
    weight: number;
    height: number;
    training_goal: string;
    activity_level: string;
    medical_condition: string;
    allergies: string;
    dietary_restrictions: string;
    meal_frequency: number;
    current_training_plan: string;
    training_frequency_duration: string;
  }
  
  

  export type RefeicaoTipo = 'cafe_da_manha' | 'lanche_da_manha' | 'almoco' | 'lanche_da_tarde' | 'jantar';

export interface DietDataProps {
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


  
  
  export async function createDiet(data: QuestionnaireData): Promise<DietDataProps> {
    console.log("data: "+data.activity_level)
    const { name, email, age, gender, weight, height, training_goal, activity_level, medical_condition, allergies, dietary_restrictions, meal_frequency, current_training_plan, training_frequency_duration } = data;
    const imc = weight / ((height / 100) ** 2);
    const tmb = Number(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age))
    
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
  
                  Idade: ${age}
                  Sexo: ${gender}
                  Peso: ${weight} kg
                  Altura: ${height} cm
                  Taxa Metabólica Basal: ${tmb}
                  Índice de massa corporal: ${imc}
                  Objetivo de treinamento: ${training_goal}
                  Nível de Atividade Física: ${activity_level}
                  Condição de Saúde?: ${medical_condition}
                  Alergia?: ${allergies}
                  Restrições Alimentares?: ${dietary_restrictions}
                  Frequência de refeições por dia: ${meal_frequency}
                  Plano de treinamento atual?: ${current_training_plan}
                  Frequência e duração de treinos: ${training_frequency_duration}
  
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
                        }
                    }
                  }
                  Preencha as refeições (cafe_da_manha, lanche_da_manha, almoco, lanche_da_tarde, jantar) com alimentos que atendam às necessidades diárias de proteínas, carboidratos e gorduras.
                  Inclua no JSON para cada alimento: nome, quantidade(em gramas ou unidades, especifique a unidade. Exemplo: 25g, 2 Unidades), proteina, carboidrato, e gordura.
                  As quantidades e a composição dos alimentos devem alinhar-se com os valores recomendados de macronutrientes calculados anteriormente.
                  Especifique quando necessário a preparação do alimento, exemplo: (Ovo cozido, Ovo frito)
  
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
        const diet: DietDataProps = JSON.parse(response.data.choices[0].message.content);
        console.log(diet)
        diet.email = email
        console.log(diet)

        if (!diet) {
            throw new Error('Resposta inválida da API');
        }

        return diet;
      } catch (err) {
        console.log(err)
      }
      
  }