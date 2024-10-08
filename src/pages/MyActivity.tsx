import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ActivityCard } from "@/components/activity-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectCards, Navigation, Pagination, Scrollbar } from "swiper/modules";

export function MyActivity() {
  interface Exercise {
    nome: string;
    series: number;
    repeticoes: number;
    descanso_segundos: number;
  }
  
  interface Dia {
    checked: boolean;
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

  const [shouldFetchWorkoutPlan, setShouldFetchWorkoutPlan] = useState<boolean>(true);

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
        console.log('activityplan recebido da API:', response.data);
        setWorkoutPlan(response.data[0]);
        setShouldFetchWorkoutPlan(false);
      } catch (err) {
        console.error('Erro ao buscar dieta:', err);
      }
    };

    if (shouldFetchWorkoutPlan) {
      fetchWorkoutPlanData();
    }
    
  }, [email, shouldFetchWorkoutPlan]);

  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center">
            Olá, { workoutPlan.nome }! Este é o seu Plano de Treinamento.
          </h2>
        </div>

        {workoutPlan && (
        <div className="pt-4 px-24 flex flex-row">
          <div className="absolute">
          <h2 className="text-[1.25em]"><strong>Objetivo: </strong></h2>
          <p>{workoutPlan.objetivo_treino} </p>
          <br />
          <h2 className="text-[1.25em]"><strong>Treinos por semana: </strong></h2>
          <p>{workoutPlan.dias_por_semana} </p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCards]}
            effect="cards"
            cardsEffect={{
                slideShadows: false,
              }}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className="w-[100vh] h-[34rem] mx-auto"
          >
            {workoutPlan && workoutPlan.plano_exercicios.map((dia) => (
                <SwiperSlide key={workoutPlan.id}>
                  <ActivityCard workoutPlan={workoutPlan} dia={dia} setShouldFetchWorkoutPlan={setShouldFetchWorkoutPlan}/>
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
         )}
      </div>

      

    </div>
  );
}
