import React, { useState } from 'react';
import { createDiet, DietDataProps } from './CreatingDiet';
import axios from 'axios';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { QuestionCarouselItem } from './QuestionCarouselItem';
import { useNavigate } from 'react-router-dom';



const saveDietData = async (diet: DietDataProps) => {
  try {
    const response = await axios.post('http://localhost:3000/diets', diet);
    console.log('Dados salvos com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
  }
};



export function Questionnaire() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [ageValue, setAgeValue] = useState([33]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState([50]);
  const [trainingGoal, setTrainingGoal] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('Não');
  const [foodAllergy, setFoodAllergy] = useState('Não');
  const [trainingFrequency, setTrainingFrequency] = useState('');

  const dietData = {
    name,
    email,
    phone,
    gender,
    ageValue,
    weight,
    height,
    trainingGoal,
    activityLevel,
    medicalCondition,
    foodAllergy,
    trainingFrequency,
  };

  const navigate = useNavigate();
  const handleNavigate = (email: string) => {
    localStorage.setItem('email', email);
    navigate(`/plano-alimentar?email=${encodeURIComponent(email)}`);
  };

  async function handleSubmitDiet() {
    try{
      const diet = await createDiet(dietData)
      console.log(diet)
      if (diet) {
        saveDietData(diet);
        handleNavigate(email);
      }
    } catch (error) {
      console.error('Erro ao enviar a dieta:', error);
    }
  }

  return (
    <div className='flex flex-col'>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 9 }).map((_, index) => (
            <QuestionCarouselItem
              id={index+1}
              name={name}
              email={email}
              phone={phone}
              gender={gender}
              ageValue={ageValue}
              weight={weight}
              height={height}
              trainingGoal={trainingGoal}
              activityLevel={activityLevel}
              medicalCondition={medicalCondition}
              foodAllergy={foodAllergy}
              trainingFrequency={trainingFrequency}
              setName={setName}
              setEmail={setEmail}
              setPhone={setPhone}
              setGender={setGender}
              setAgeValue={setAgeValue}
              setWeight={setWeight}
              setHeight={setHeight}
              setTrainingGoal={setTrainingGoal}
              setActivityLevel={setActivityLevel}
              setMedicalCondition={setMedicalCondition}
              setFoodAllergy={setFoodAllergy}
              setTrainingFrequency={setTrainingFrequency}
              handleSubmitDiet={handleSubmitDiet}
            />
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious/>
      </Carousel>
    </div>
  );
} 
