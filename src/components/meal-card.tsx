import { NutrientDistributionChart } from "./nutrient-distribuition-chart";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Card, CardFooter } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

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
    url: string;
    foodItems: FoodItemProps[];
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


  export function MealCard({ url, foodItems }: MealCardProps) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button asChild>
            <Card className="relative w-[250px] h-[45vh] transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0">
                <img
                  src={url}
                  alt="Imagem do Card"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <CardFooter className="absolute bottom-0 left-0 w-full flex justify-between z-10">
                <span className="font-semibold" style={textStyle}>Café da Manhã</span>
              </CardFooter>
            </Card>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[530px]">
          <DialogHeader>
            <DialogTitle>Café da manhã</DialogTitle>
            <Table>
              <TableCaption>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Ver Distribuição de Nutrientes</AccordionTrigger>
                    <AccordionContent>
                      <NutrientDistributionChart data={calculateNutrients(foodItems)} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }