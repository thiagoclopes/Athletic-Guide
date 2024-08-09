import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface QuestionCarouselItemProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    ageValue: number[];
    weight: string;
    height: number[];
    trainingGoal: string;
    activityLevel: string;
    medicalCondition: string;
    foodAllergy: string;
    trainingFrequency: string;
    setName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhone: (value: string) => void;
    setGender: (value: string) => void;
    setAgeValue: (value: number[]) => void;
    setWeight: (value: string) => void;
    setHeight: (value: number[]) => void;
    setTrainingGoal: (value: string) => void;
    setActivityLevel: (value: string) => void;
    setMedicalCondition: (value: string) => void;
    setFoodAllergy: (value: string) => void;
    setTrainingFrequency: (value: string) => void;
    handleSubmitDiet: () => void;
  }

export function QuestionCarouselItem({id, name, email, phone, gender, ageValue, weight, height, trainingGoal, activityLevel, 
    medicalCondition, foodAllergy, trainingFrequency, setName, setEmail, setPhone, setGender, setAgeValue, 
    setWeight, setHeight, setTrainingGoal, setActivityLevel, setMedicalCondition, setFoodAllergy, setTrainingFrequency, handleSubmitDiet}: QuestionCarouselItemProps){
    
        const [isCondition, setCondition] = useState<string>("");
        const [isFoodAllergy, setStateFoodAllergy] = useState<string>("");

    useEffect(() => {
        if (isCondition === "Sim") {
          setMedicalCondition("");
        }
      }, [isCondition]);

      useEffect(() => {
        if (isFoodAllergy === "Sim") {
          setFoodAllergy("");
        }
      }, [isFoodAllergy]);

    

return (
    <CarouselItem key={id}>
      <div className="p-1">
        {id === 1 && (
            <Card className="aspect-square">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-center">
                    Digite seus dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-5">
                  <Input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Select value={gender} onValueChange={(value: string) => setGender(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione seu sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Feminino">Feminino</SelectItem>
                        <SelectItem value="Intersexual">Intersexual</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </CardContent>
            </Card>
        )}
        {id === 2 && (
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">
                Qual a sua idade?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5">
              <Slider className="pt-16"
              value={ageValue}
              onValueChange={(setAgeValue)}
              defaultValue={[33]} 
              max={100} 
              step={1} />
              <h2 className="text-xl font-semibold text-center">{ageValue[0]} anos </h2>
            </CardContent>
          </Card>
        )}
        {id === 3 && (
        <Card className="aspect-square">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Qual a sua altura?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-row items-center justify-center gap-2">
                <InputOTP 
                    maxLength={3}
                    value={weight}
                    onChange={(weight) => setWeight(weight)}
                >
                    <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    </InputOTPGroup>
                </InputOTP>
                <span className="font-bold">cm</span>
            </div>
            <div className="flex flex-col w-full gap-3">
                <h2 className="font-semibold">E o peso?</h2>
                <Slider
                value={height}
                onValueChange={(setHeight)}
                defaultValue={[50]} 
                max={100} 
                step={1} />
                <h2 className="text-xl font-semibold text-center">{height[0]}kg </h2>
            </div>
          </CardContent>
        </Card>
      )}
      {id === 4 && (
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center mb-10">
                Qual o seu objetivo?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5">
                <Textarea
                    placeholder="Exemplo: Ganhar massa muscular" 
                    value={trainingGoal}
                    onChange={(e) => setTrainingGoal(e.target.value)}
                />
            </CardContent>
          </Card>
        )}
        {id === 5 && (
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center  mb-10">
                Qual o seu nível de atividade fisica?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5">
                <Select value={activityLevel} onValueChange={(value: string) => setActivityLevel(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Sedentário">Sedentário</SelectItem>
                        <SelectItem value="Moderado">Moderado</SelectItem>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Muito Ativo">Muito Ativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
            </CardContent>
          </Card>
        )}
        {id === 6 && (
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center  mb-3">
              Tem alguma condição médica relevante?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5">
                <RadioGroup
                    defaultValue="Não"
                    value={isCondition}
                    onValueChange={(value) => setCondition(value)}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sim" id="r1" />
                        <Label htmlFor="r1">Sim</Label>
                        <RadioGroupItem value="Não" id="r2" />
                        <Label htmlFor="r2">Não</Label>
                        
                    </div>
                </RadioGroup>
                {isCondition === "Sim" && (
                    <Textarea
                    placeholder="Descreva sua condição médica"
                    value={medicalCondition}
                    onChange={(e) => setMedicalCondition(e.target.value)}
                    />
                )}
            </CardContent>
          </Card>
        )}
        {id === 7 && (
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center  mb-3">
                Você tem alguma alergia alimentar ou intolerância?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5 mb-3">
                <RadioGroup
                    defaultValue="Não"
                    value={isFoodAllergy}
                    onValueChange={(value) => setStateFoodAllergy(value)}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sim" id="r1" />
                        <Label htmlFor="r1">Sim</Label>
                        <RadioGroupItem value="Não" id="r2" />
                        <Label htmlFor="r2">Não</Label>
                        
                    </div>
                </RadioGroup>
                {isFoodAllergy === "Sim" && (
                    <Textarea
                    placeholder="Liste aqui os alimentos"
                    value={foodAllergy}
                    onChange={(e) => setFoodAllergy(e.target.value)}
                    />
                )}
            </CardContent>
          </Card>
        )}
        {id === 8 && (
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center  mb-3">
                Com que frequência você treina?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5">
                <Select value={trainingFrequency} onValueChange={(value: string) => setTrainingFrequency(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1x por Semana">1x por Semana</SelectItem>
                        <SelectItem value="2x por Semana">2x por Semana</SelectItem>
                        <SelectItem value="3x por Semana">3x por Semana</SelectItem>
                        <SelectItem value="4x por Semana">4x por Semana</SelectItem>
                        <SelectItem value="5x por Semana">5x por Semana</SelectItem>
                        <SelectItem value="6x por Semana">6x por Semana</SelectItem>
                        <SelectItem value="7x por Semana">7x por Semana</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>
          </Card>
        )}
        {id === 9 && (
          <Card className="aspect-square">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center mb-14">
                    Finalizar cadastro
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-5">
                <Button onClick={handleSubmitDiet}>Enviar dados</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </CarouselItem>
  );
}