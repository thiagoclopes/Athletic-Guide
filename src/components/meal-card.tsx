import { RefeicaoTipo } from "@/pages/InformationCapture/CreatingDiet";
import { NutrientDistributionChart } from "./nutrient-distribuition-chart";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardFooter } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import CachedIcon from '@mui/icons-material/Cached';

const textStyle = {
    color: 'white',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
  };

  interface FoodItemProps {
    nome: string;
    quantidade: number;
    proteina: number;
    carboidrato: number;
    gordura: number;
  }
  
  interface NutrientData {
    proteinas: number;
    carboidratos: number;
    gordura: number;
  }

  interface MealCardProps {
    id: string | undefined;
    mealType: RefeicaoTipo;
    url: string;
    foodItems: FoodItemProps[];
    updateMealPlan: (id: string | undefined, mealType: RefeicaoTipo, foodItems: FoodItemProps[]) => Promise<void>;
  }

  function calculateNutrients(alimentos: FoodItemProps[]): NutrientData {
    return alimentos.reduce(
      (acc, item) => {
        acc.proteinas += item.proteina;
        acc.carboidratos += item.carboidrato;
        acc.gordura += item.gordura;
        return acc;
      },
      { proteinas: 0, carboidratos: 0, gordura: 0 }
    );
  }


  export function MealCard({id, mealType, url, foodItems, updateMealPlan }: MealCardProps) {
    
    const handleUpdate = async () => {
      await updateMealPlan(id, mealType, foodItems)
    }

    
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button asChild>
            <Card className="relative w-[27%] h-[45vh] transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0">
                <img
                  src={url}
                  alt="Imagem do Card"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <CardFooter className="absolute bottom-0 left-0 w-full flex justify-between z-10">
                <span className="font-semibold text-sm" style={textStyle}>
                  {mealType === 'cafe_da_manha' && <p>Café da Manhã</p>}
                  {mealType === 'lanche_da_manha' && <p>Lanche da Manhã</p>}
                  {mealType === 'almoco' && <p>Almoço</p>}
                  {mealType === 'lanche_da_tarde' && <p>Lanche da Tarde</p>}
                  {mealType === 'jantar' && <p>Janta</p>}
                  {mealType === 'ceia' && <p>Ceia</p>}
                </span>
              </CardFooter>
            </Card>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]" aria-describedby={undefined}>
          <DialogHeader className="flex flex-row items-center">
            <DialogTitle>
             {mealType === 'cafe_da_manha' && <p>Café da Manhã</p>}
             {mealType === 'lanche_da_manha' && <p>Lanche da Manhã</p>}
             {mealType === 'almoco' && <p>Almoço</p>}
             {mealType === 'lanche_da_tarde' && <p>Lanche da Tarde</p>}
             {mealType === 'jantar' && <p>Janta</p>}
             {mealType === 'ceia' && <p>Ceia</p>}
            </DialogTitle>
          </DialogHeader>
            <Table>
              <TableCaption>
                <div className="flex flex-col">
                  <div className="flex flex-row-reverse">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-40"><span className="pb-1 font-bold">Alterar refeição</span><CachedIcon className="ml-2" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Ao continuar você estará trocando a refeição atual.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleUpdate}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Ver Distribuição de Nutrientes</AccordionTrigger>
                      <AccordionContent>
                        <NutrientDistributionChart data={calculateNutrients(foodItems)} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Alimento</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Proteínas</TableHead>
                  <TableHead>Carboidratos</TableHead>
                  <TableHead>Gordura</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foodItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">{item.nome}</TableCell>
                    <TableCell className="text-center">{item.quantidade}</TableCell>
                    <TableCell className="text-center">{item.proteina}g</TableCell>
                    <TableCell className="text-center">{item.carboidrato}g</TableCell>
                    <TableCell className="text-center">{item.gordura}g</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          
        </DialogContent>
      </Dialog>
    );
  }