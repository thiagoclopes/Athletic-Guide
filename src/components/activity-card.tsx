import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import CachedIcon from '@mui/icons-material/Cached';
import CheckIcon from '@mui/icons-material/Check';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import axios from "axios";


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

interface WorkoutPlanProps {
    id: string;
    objetivo_treino: string;
    dias_por_semana: number;
    plano_exercicios: Dia[];
    email: string;
    nome: string;
}


export function ActivityCard({ workoutPlan, dia, setShouldFetchWorkoutPlan }: { workoutPlan: WorkoutPlanProps, dia: Dia, setShouldFetchWorkoutPlan: (check: boolean) => void;}) {

    async function handleClick(dia: Dia){
        dia.checked = !dia.checked
        const response = await axios.put(`http://localhost:3000/workout-plan/${workoutPlan.id}`,{
            objetivo_treino: workoutPlan.objetivo_treino,
            dias_por_semana: workoutPlan.dias_por_semana,
            plano_exercicios: workoutPlan.plano_exercicios,
            email: workoutPlan.email,
            nome: workoutPlan.nome
        });
        setShouldFetchWorkoutPlan(true)
        console.log('Dados atualizados com sucesso:', response.data);  
        
    }

    return (
        <Card className="w-[70vh] h-[34rem] m-auto">
            <div style={{ opacity: dia.checked ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
                <CardHeader className="flex flex-row justify-between" >
                    <div className="flex flex-col">
                        <CardTitle>{`Dia ${dia.dia}`}</CardTitle>
                        <CardDescription>{`Tipo de Treino: ${dia.tipo_treino}`}</CardDescription>
                    </div>
                    <Button variant="outline" className="mr-5 w-8 h-8 border-2 border-zinc-500"  onClick={() => {handleClick(dia); console.log(dia.checked);}}>
                        {dia.checked && (
                            <CheckIcon
                                className="pl-2 pb-2"
                                style={{ fontSize: '58px', fontWeight: 'bold' }}
                                color="success"
                            />
                        )}
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
            </div>
        </Card>
    );
}
