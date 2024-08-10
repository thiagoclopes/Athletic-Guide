import { useEffect, useState } from "react";
import axios from "axios";
import { DietDataProps } from "./InformationCapture/CreatingDiet";
import { useLocation } from "react-router-dom";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Button } from "@/components/ui/button";
import { MealCard } from "@/components/meal-card";

export function MealPlan() {
  const [diet, setDiet] = useState<DietDataProps>({
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
        console.log('Dados recebidos da API:', response.data);
        setDiet(response.data[0]);
      } catch (err) {
        console.error('Erro ao buscar dieta:', err);
      }
    };

    fetchDietData();
  }, [email]);

  const breakfastItems = diet.exemplo_de_plano_de_refeicoes.cafe_da_manha.alimentos;
  const morningsnackItems = diet.exemplo_de_plano_de_refeicoes.lanche_da_manha.alimentos;
  const lunchItems = diet.exemplo_de_plano_de_refeicoes.almoco.alimentos;
  const afternoonsnackItems = diet.exemplo_de_plano_de_refeicoes.lanche_da_tarde.alimentos;
  const dinnerItems = diet.exemplo_de_plano_de_refeicoes.jantar.alimentos;
  const supperItems = diet.exemplo_de_plano_de_refeicoes.ceia.alimentos;
  const nome = diet.nome;

  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center">
            Olá, { nome}! Este é o seu Plano de Alimentação.
          </h2>
          <div className="pt-4 pl-24">
            <br />
            <h2 className="text-[1.25em]"><strong>Objetivo Calórico:</strong></h2>
            <p>{diet.objetivo_calorico}</p>
            <br />
            <h2 className="text-[1.25em]"><strong>Necessidades Calóricas Diárias para Objetivo</strong></h2>
            <p>{diet.necessidades_caloricas_diarias_para_objetivo} calorias</p>
            <br />
            <h2 className="text-[1.25em]"><strong>Plano de Refeições Diárias</strong></h2>
            <p>Total de Refeições: {diet.plano_de_refeicoes_diarias.total_de_refeicoes}</p>
            <p>Calorias por Refeição: {diet.plano_de_refeicoes_diarias.calorias_por_refeicao}</p>
            <br />
            <h2 className="text-[1.25em]"><strong>Necessidades Diárias de Macronutrientes</strong></h2>
            <p>Proteínas: {diet.necessidades_diarias_de_macronutrientes.proteinas}</p>
            <p>Carboidratos: {diet.necessidades_diarias_de_macronutrientes.carboidratos}</p>
            <p>Gorduras: {diet.necessidades_diarias_de_macronutrientes.gorduras}</p>
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
        <MealCard title="Café da manhã" url="https://blog.samisaude.com.br/wp-content/uploads/2023/01/high-angle-table-full-of-delicious-food-arrangement-1.jpg" foodItems={breakfastItems}/>
        <MealCard title="Lanche da manhã" url="https://blog.bodytech.com.br/wp-content/uploads/2018/10/alimentos_falsos_saudaveis.jpg" foodItems={morningsnackItems}/>
        <MealCard title="Almoço" url="https://imagens-revista.vivadecora.com.br/uploads/2022/03/ideias-de-almoco-de-domingo-simples-e-rapido-de-fazer-Foto-iStock.jpg" foodItems={lunchItems}/>
      </div>
      <div className="flex flex-row gap-5 items-center mb-8 justify-center">
        <MealCard title="Lanche da Tarde" url="https://runfun.com.br/runfun2021/wp-content/uploads/2020/04/lanche-da-tarde.jpg" foodItems={afternoonsnackItems}/>
        <MealCard title="Janta" url="https://areademulher.r7.com/wp-content/uploads/2020/10/jantar-rapido-melhores-receitas-para-fazer-em-casa-2-1200x900.jpg" foodItems={dinnerItems}/>
        <MealCard title="Ceia" url="https://img.freepik.com/fotos-gratis/eucaristia-com-calice-de-vinho-e-uvas_23-2149381627.jpg" foodItems={supperItems}/>
      </div>

    </div>
  );
}
