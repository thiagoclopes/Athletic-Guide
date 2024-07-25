import { useEffect, useState } from "react";
import axios from "axios";
import { DietDataProps } from "./InformationCapture/CreatingDiet";
import { useLocation } from "react-router-dom";
import { MealPlanTable } from "../components/mealplan-table";

export function MealPlan() {
  const [diet, setDiet] = useState<DietDataProps>({
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
    },
  });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const email = query.get('email');

  useEffect(() => {
    const fetchDietData = async () => {
      if (!email) {
        console.error('Email não fornecido na URL');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/diets`, {
          params: { email }
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

  return (
    <div>
      <h1>Plano de Alimentação</h1>
      <h2>Objetivo Calórico</h2>
      <p>{diet.objetivo_calorico}</p>

      <h2>Necessidades Calóricas Diárias para Objetivo</h2>
      <p>{diet.necessidades_caloricas_diarias_para_objetivo} calorias</p>

      <h2>Plano de Refeições Diárias</h2>
      <p>Total de Refeições: {diet.plano_de_refeicoes_diarias.total_de_refeicoes}</p>
      <p>Calorias por Refeição: {diet.plano_de_refeicoes_diarias.calorias_por_refeicao}</p>

      <h2>Necessidades Diárias de Macronutrientes</h2>
      <p>Proteínas: {diet.necessidades_diarias_de_macronutrientes.proteinas}</p>
      <p>Carboidratos: {diet.necessidades_diarias_de_macronutrientes.carboidratos}</p>
      <p>Gorduras: {diet.necessidades_diarias_de_macronutrientes.gorduras}</p>

      <MealPlanTable foodItems={breakfastItems} title="Café da manhã" />
      <MealPlanTable foodItems={morningsnackItems} title="Lanche da manhã" />
      <MealPlanTable foodItems={lunchItems} title="Almoço" />
      <MealPlanTable foodItems={afternoonsnackItems} title="Lanche da tarde" />
      <MealPlanTable foodItems={dinnerItems} title="Janta" />
    </div>
  );
}
