import { useEffect, useState } from "react";
import axios from "axios";
import { DietDataProps, RefeicaoTipo } from "./InformationCapture/CreatingDiet";
import { useLocation } from "react-router-dom";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Button } from "@/components/ui/button";
import { MealCard } from "@/components/meal-card";



export function MealPlan() {
  const [diet, setDiet] = useState<DietDataProps>({
    id: '',
    email: '',
    nome: '',
    objetivo_calorico: '',
    necessidades_caloricas_diarias_para_objetivo: 0,
    plano_de_refeicoes_diarias: {
      total_de_refeicoes: 0,
      calorias_por_refeicao: 0,
    },
    necessidades_diarias_de_macronutrientes: {
      proteinas: 0,
      carboidratos: 0,
      gorduras: 0,
    },
    exemplo_de_plano_de_refeicoes: {
      cafe_da_manha: { alimentos: [] },
      lanche_da_manha: { alimentos: [] },
      almoco: { alimentos: [] },
      lanche_da_tarde: { alimentos: [] },
      jantar: { alimentos: [] },
      ceia: { alimentos: [] },
    },
  });

  const [shouldFetchDiet, setShouldFetchDiet] = useState(true);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const email = query.get('email');

  useEffect(() => {
    const fetchDietData = async () => {
      const cachedEmail = email || localStorage.getItem('email') ;

      if (!cachedEmail) {
        console.error('Email não fornecido na URL ou no cache');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/diets`, {
          params: { email: cachedEmail }
        });
        console.log('mealplan recebido da API:', response.data);
        setDiet(response.data[0]);
        setShouldFetchDiet(false);
      } catch (err) {
        console.error('Erro ao buscar dieta:', err);
      }
    };

    if (shouldFetchDiet) {
      fetchDietData();
    }
  }, [email, shouldFetchDiet]);

  interface FoodItemProps {
    nome: string;
    quantidade: number;
    proteina: number;
    carboidrato: number;
    gordura: number;
  }

  async function updateMealPlan(id: string | undefined, mealType: RefeicaoTipo, foodItems: FoodItemProps[]) {
      if (!id) {
        console.error('ID não fornecido.');
        return;
    }
    try {
      const aiResponse = await axios.post(
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
                Atualize o JSON abaixo, trocando somente os alimentos da refeição por equivalentes em nutrição:

                Refeição: ${mealType}
                JSON:

                ${JSON.stringify(foodItems, null, 2)}
                
                Mantenha a formatação, especificando quando necessário a preparação do alimento, exemplo: (Ovo cozido, Ovo frito)

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
      const updatedFoodItem: FoodItemProps[] = JSON.parse(aiResponse.data.choices[0].message.content);
      console.log('Resposta da API:', updatedFoodItem);
      if (!updatedFoodItem) {
          throw new Error('Resposta inválida da API');
      }

      if (mealType in diet.exemplo_de_plano_de_refeicoes) {
        diet.exemplo_de_plano_de_refeicoes[mealType].alimentos = updatedFoodItem;
    }

    try {
      const response = await axios.put(`http://localhost:3000/diets/${id}`,{
        objetivo_calorico: diet.objetivo_calorico,
        necessidades_caloricas_diarias_para_objetivo: diet.necessidades_caloricas_diarias_para_objetivo,
        exemplo_de_plano_de_refeicoes: diet.exemplo_de_plano_de_refeicoes,
        plano_de_refeicoes_diarias: diet.plano_de_refeicoes_diarias,
        necessidades_diarias_de_macronutrientes: diet.necessidades_diarias_de_macronutrientes,
        email: diet.email,
        nome: diet.nome
      });
      console.log('Dados atualizados com sucesso:', response.data);
      setShouldFetchDiet(true);
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }

    } catch (err) {
      console.log(err)
    }
  }

  const breakfastItems = diet.exemplo_de_plano_de_refeicoes.cafe_da_manha.alimentos;
  const morningsnackItems = diet.exemplo_de_plano_de_refeicoes.lanche_da_manha.alimentos;
  const lunchItems = diet.exemplo_de_plano_de_refeicoes.almoco.alimentos;
  const afternoonsnackItems = diet.exemplo_de_plano_de_refeicoes.lanche_da_tarde.alimentos;
  const dinnerItems = diet.exemplo_de_plano_de_refeicoes.jantar.alimentos;
  const supperItems = diet.exemplo_de_plano_de_refeicoes.ceia.alimentos;
  const breakfastType: RefeicaoTipo = 'cafe_da_manha';
  const morningsnackType: RefeicaoTipo = 'lanche_da_manha';
  const lunchType: RefeicaoTipo = 'almoco';
  const afernoonsnackType: RefeicaoTipo = 'lanche_da_tarde';
  const dinnerType: RefeicaoTipo = 'jantar';
  const supperType: RefeicaoTipo = 'ceia';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center">
            Olá, { diet.nome}! Este é o seu Plano de Alimentação.
          </h2>
          <div className="pt-4 pl-24">
            <br />
            <h2 className="text-[1.25em]"><strong>Objetivo Calórico:</strong></h2>
            <p>{diet.objetivo_calorico}</p>
            <br />
            <h2 className="text-[1.25em]"><strong>Necessidades Calóricas Diárias para Objetivo:</strong></h2>
            <p>{diet.necessidades_caloricas_diarias_para_objetivo} calorias</p>
            <br />
            <h2 className="text-[1.25em]"><strong>Total de Refeições:</strong></h2>
            <p>{diet.plano_de_refeicoes_diarias.total_de_refeicoes}</p>
            <br />
            <h2 className="text-[1.25em]"><strong>Calorias por Refeição:</strong></h2>
            <p> {diet.plano_de_refeicoes_diarias.calorias_por_refeicao}</p>
            <br />
            <h2 className="text-[1.25em]"><strong>Necessidades Diárias de Macronutrientes:</strong></h2>
            <p>- Proteínas: {diet.necessidades_diarias_de_macronutrientes.proteinas}</p>
            <p>- Carboidratos: {diet.necessidades_diarias_de_macronutrientes.carboidratos}</p>
            <p>- Gorduras: {diet.necessidades_diarias_de_macronutrientes.gorduras}</p>
          </div>
        </div>

        <Button className="mt-4 mb-8 w-[84%] mx-auto" onClick={() => {
          const element = document.getElementById('mealplan');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}>
          <ArrowCircleDownIcon />
        </Button>
      </div>
      <div id='mealplan' className="flex flex-row gap-5 items-center justify-center mb-5">
        <MealCard
          id={diet.id}
          mealType={breakfastType}
          url="https://blog.samisaude.com.br/wp-content/uploads/2023/01/high-angle-table-full-of-delicious-food-arrangement-1.jpg"
          foodItems={breakfastItems}
          updateMealPlan={updateMealPlan}
        />
        <MealCard
          id={diet.id}
          mealType={morningsnackType}
          url="https://blog.bodytech.com.br/wp-content/uploads/2018/10/alimentos_falsos_saudaveis.jpg"
          foodItems={morningsnackItems}
          updateMealPlan={updateMealPlan}
        />
        <MealCard
          id={diet.id}
          mealType={lunchType}
          url="https://imagens-revista.vivadecora.com.br/uploads/2022/03/ideias-de-almoco-de-domingo-simples-e-rapido-de-fazer-Foto-iStock.jpg"
          foodItems={lunchItems}
          updateMealPlan={updateMealPlan}
        />
      </div>
      <div className="flex flex-row gap-5 items-center mb-8 justify-center">
        <MealCard
          id={diet.id}
          mealType={afernoonsnackType}
          url="https://runfun.com.br/runfun2021/wp-content/uploads/2020/04/lanche-da-tarde.jpg"
          foodItems={afternoonsnackItems}
          updateMealPlan={updateMealPlan}
        />
        <MealCard
          id={diet.id}
          mealType={dinnerType}
          url="https://areademulher.r7.com/wp-content/uploads/2020/10/jantar-rapido-melhores-receitas-para-fazer-em-casa-2-1200x900.jpg"
          foodItems={dinnerItems}
          updateMealPlan={updateMealPlan}  
        />
        <MealCard
          id={diet.id}
          mealType={supperType}
          url="https://img.freepik.com/fotos-gratis/eucaristia-com-calice-de-vinho-e-uvas_23-2149381627.jpg"
          foodItems={supperItems}
          updateMealPlan={updateMealPlan}  
        />
      </div>

    </div>
  );
}
