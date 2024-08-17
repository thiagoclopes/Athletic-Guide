import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import CachedIcon from '@mui/icons-material/Cached';
import CheckIcon from '@mui/icons-material/Check';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { EffectCards } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


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

interface WorkoutPlanProps {
    id: string;
    objetivo_treino: string;
    dias_por_semana: number;
    plano_exercicios: Dia[];
    email: string;
    nome: string;
}

export function ActivityCard({ workoutPlan }: { workoutPlan: WorkoutPlanProps }) {
    return (
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
                <SwiperSlide>
                    <Card key={dia.dia} className="w-[70vh] h-[34rem] m-auto">
                        <CardHeader className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <CardTitle>{`Dia ${dia.dia}`}</CardTitle>
                                <CardDescription>{`Tipo de Treino: ${dia.tipo_treino}`}</CardDescription>
                            </div>
                            <Button className="mr-5 w-8 h-8">
                                <CheckIcon className="pl-2 pb-2" style={{ fontSize: '58px', fontWeight: 'bold'}} color="success"/>
                            </Button>
                        </CardHeader>
                        <CardContent>
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
                            
                            <TableFooter className="flex flex-row justify-between pt-10">
                                <div className="flex flex-col">
                                    <p><strong>Aquecimento:</strong> {dia.aquecimento}</p>
                                    <p><strong>Alongamento:</strong> {dia.alongamento}</p>
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" className="w-40">
                                            <span className="pb-1 font-bold">Alterar treino</span>
                                            <CachedIcon className="ml-2" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Ao continuar você estará trocando o treino atual.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction>Continuar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableFooter>
                        </CardContent>
                    </Card>
                </SwiperSlide>
            ))}
            
        </Swiper>
    );
}
