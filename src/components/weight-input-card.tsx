import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input"
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';

export function WeightInputCard(){
    const today = new Date().toLocaleDateString();
    return(
        <div className="pt-2 px-2 h-full">
            <Card className="flex flex-col">
                <CardContent className="h-full">
                    <div className="flex justify-center pt-6 pb-8">
                        <p className="font-bold pr-2">Registro de peso</p>
                        <ScaleOutlinedIcon className=""/>
                    </div>
                    <p className="text-center mb-4">{today}</p>
                    <Input type="number" placeholder="Digite seu peso (kg)" className="mx-auto mb-8"/>
                    <div className="flex justify-center pb-2">
                        <Button>Enviar</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}