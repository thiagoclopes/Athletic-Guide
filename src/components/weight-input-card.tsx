import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input"
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';

export function WeightInputCard(){
    return(
        <div className="px-2 h-full">
            <Card>
                <div className="flex justify-center pt-6 pb-8">
                    <p className="font-bold pr-2">Registro de peso</p>
                    <ScaleOutlinedIcon className=""/>
                </div>
                <Input type="number" placeholder="Digite seu peso (kg)" className="mx-auto mb-10"/>
                <div className="flex justify-center pb-4">
                    <Button>oi</Button>
                </div>
            </Card>
        </div>
    )
}