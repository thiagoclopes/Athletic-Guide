import { useEffect, useState } from "react";
import axios from "axios";
import { DietDataProps } from "./InformationCapture/CreatingDiet";
import { useLocation } from "react-router-dom";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NutrientDistributionChart } from "@/components/nutrient-distribuition-chart";
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
    },
  });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const email = query.get('email');

  useEffect(() => {
    const fetchDietData = async () => {
      const cachedEmail = localStorage.getItem('email') || email;

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
  const nome = diet.nome;

  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-[calc(100vh-5rem)] flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center">
            Olá, { nome}! Este é o seu Plano de Alimentação.
          </h2>
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
        </div>

        <Button className="mt-4 mb-8" onClick={() => {
          const element = document.getElementById('mealplan');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}>
          <ArrowCircleDownIcon />
        </Button>
      </div>

      <div id='mealplan' className="flex flex-row gap-5  items-center justify-center mb-5">
<<<<<<< HEAD
        <MealCard url="https://blog.samisaude.com.br/wp-content/uploads/2023/01/high-angle-table-full-of-delicious-food-arrangement-1.jpg" foodItems={breakfastItems}/>
        <MealCard url="https://blog.bodytech.com.br/wp-content/uploads/2018/10/alimentos_falsos_saudaveis.jpg" foodItems={morningsnackItems}/>
        <MealCard url="https://imagens-revista.vivadecora.com.br/uploads/2022/03/ideias-de-almoco-de-domingo-simples-e-rapido-de-fazer-Foto-iStock.jpg" foodItems={lunchItems}/>
      </div>
      <div className="flex flex-row gap-5 items-center justify-center">
        <MealCard url="https://runfun.com.br/runfun2021/wp-content/uploads/2020/04/lanche-da-tarde.jpg" foodItems={afternoonsnackItems}/>
        <MealCard url="https://areademulher.r7.com/wp-content/uploads/2020/10/jantar-rapido-melhores-receitas-para-fazer-em-casa-2-1200x900.jpg" foodItems={dinnerItems}/>
=======
        <Card className="relative w-[320px] h-[45vh] transition-transform duration-300 hover:scale-105 cursor:pointer"  >
          <div className="absolute inset-0">
            <img
              src="https://blog.samisaude.com.br/wp-content/uploads/2023/01/high-angle-table-full-of-delicious-food-arrangement-1.jpg"
              alt="Imagem do Card"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <CardFooter className="absolute bottom-0 left-0 w-full flex justify-between z-10">
            <span className="font-semibold" style={textStyle}>Café da Manhã</span>
          </CardFooter>
        </Card>

        <Card className="relative w-[320px] h-[45vh] transition-transform duration-300 hover:scale-105 cursor:pointer" >
          <div className="absolute inset-0">
            <img
              src="https://blog.bodytech.com.br/wp-content/uploads/2018/10/alimentos_falsos_saudaveis.jpg"
              alt="Imagem do Card"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <CardFooter className="absolute bottom-0 left-0 w-full flex justify-between z-10">
            <span className="font-semibold" style={textStyle}>Lanche da Manhã</span>
          </CardFooter>
        </Card>

        <Card className="relative w-[320px] h-[45vh] transition-transform duration-300 hover:scale-105 cursor:pointer" >
          <div className="absolute inset-0">
            <img
              src="https://imagens-revista.vivadecora.com.br/uploads/2022/03/ideias-de-almoco-de-domingo-simples-e-rapido-de-fazer-Foto-iStock.jpg"
              alt="Imagem do Card"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <CardFooter className="absolute bottom-0 left-0 w-full flex justify-between z-10">
            <span className="font-semibold" style={textStyle}>Almoço</span>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-row gap-5 items-center justify-center">
        <Card className="relative w-[320px] h-[45vh] transition-transform duration-300 hover:scale-105 cursor:pointer" >
          <div className="absolute inset-0">
            <img
              src="https://runfun.com.br/runfun2021/wp-content/uploads/2020/04/lanche-da-tarde.jpg"
              alt="Imagem do Card"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <CardFooter className="absolute bottom-0 left-0 w-full flex justify-between z-10">
           <span className="font-semibold" style={textStyle}>Lanche da Tarde</span>
          </CardFooter>
        </Card>

        <Card className="relative w-[320px] h-[45vh] transition-transform duration-300 hover:scale-105 cursor:pointer" >
          <div className="absolute inset-0">
            <img
              src="https://areademulher.r7.com/wp-content/uploads/2020/10/jantar-rapido-melhores-receitas-para-fazer-em-casa-2-1200x900.jpg"
              alt="Imagem do Card"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <CardFooter className="absolute bottom-0 left-0 w-full flex justify-between z-10">
            <span className="font-semibold" style={textStyle}>Janta</span>
          </CardFooter>
        </Card>

        <Card className="relative w-[320px] h-[45vh] transition-transform duration-300 hover:scale-105 cursor:pointer" >
          <div className="absolute inset-0">
            <img
              src="https://img.freepik.com/fotos-gratis/eucaristia-com-calice-de-vinho-e-uvas_23-2149381627.jpg"
              alt="Imagem do Card"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <CardFooter className="absolute bottom-0 left-0 w-full flex justify-between z-10">
            <span className="font-semibold" style={textStyle}>Ceia</span>
          </CardFooter>
        </Card>
>>>>>>> c6ab8f03a0ef60abd8364f05bbb5f9e724eeb7d9
      </div>

    </div>
  );
}
