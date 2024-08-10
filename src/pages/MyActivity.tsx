import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function MyActivity() {
  interface Exercise {
    nome: string;
    series: number;
    repeticoes: number;
    descanso_segundos: number;
  }
  
  interface Dia {
    dia: number;
    tipo_treino: string;
    exercicios: Exercise[];
    aquecimento: string;
    alongamento: string;
  }
  
  interface WorkoutPlan {
    id: string;
    objetivo_treino: string;
    dias_por_semana: number;
    plano_exercicios: Dia[];
    email: string;
    nome: string;
  }
  
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>({
    id: '',
    objetivo_treino: '',
    dias_por_semana: 0,
    plano_exercicios: [],
    email: '',
    nome: ''
  });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const email = query.get('email');

  useEffect(() => {
    const fetchWorkoutPlanData = async () => {
      const cachedEmail = email || localStorage.getItem('email') ;

      if (!cachedEmail) {
        console.error('Email não fornecido na URL ou no cache');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/workout-plan`, {
          params: { email: cachedEmail }
        });
        console.log('Dados recebidos da API:', response.data);
        setWorkoutPlan(response.data[0]);
      } catch (err) {
        console.error('Erro ao buscar dieta:', err);
      }
    };

    fetchWorkoutPlanData();
  }, [email]);

  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center">
            Olá, { workoutPlan.nome }! Este é o seu Plano de Treinamento.
          </h2>
        </div>

        {workoutPlan && (
        <div className="pt-4 px-24">
          <h2 className="text-[1.25em]"><strong>Objetivo: </strong></h2>
          <p>{workoutPlan.objetivo_treino} </p>
          <br />
          <h2 className="text-[1.25em]"><strong>Treinos por semana: </strong></h2>
          <p>{workoutPlan.dias_por_semana} </p>
          
          {workoutPlan && (
            <Accordion type="single" collapsible>
              {workoutPlan.plano_exercicios.map((dia) => (
                <AccordionItem key={dia.dia} value={`dia-${dia.dia}`}>
                  <AccordionTrigger>Dia {dia.dia}: {dia.tipo_treino}</AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Exercício</TableHead>
                          <TableHead>Séries</TableHead>
                          <TableHead>Repetições</TableHead>
                          <TableHead>Descanso (s)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dia.exercicios.map((exercicio, index) => (
                          <TableRow key={index}>
                            <TableCell>{exercicio.nome}</TableCell>
                            <TableCell>{exercicio.series}</TableCell>
                            <TableCell>{exercicio.repeticoes}</TableCell>
                            <TableCell>{exercicio.descanso_segundos}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <p><strong>Aquecimento:</strong> {dia.aquecimento}</p>
                    <p><strong>Alongamento:</strong> {dia.alongamento}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
         )}
      </div>

      

    </div>
  );
}
