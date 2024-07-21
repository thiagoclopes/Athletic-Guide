import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
}

const questions: Question[] = [
  { id: 1, question: 'Qual é o seu nome?', type: 'text' },
  { id: 2, question: 'Qual é a sua idade?', type: 'number' },
  { id: 3, question: 'Qual é o seu sexo?', type: 'select', options: ['Masculino', 'Feminino', 'Outro'] },
  { id: 4, question: 'Qual é o seu peso atual? (kg)', type: 'number' },
  { id: 5, question: 'Qual é a sua altura? (cm)', type: 'number' },
  { id: 6, question: 'Qual é o seu principal objetivo de treinamento? (Ex: Aumentar massa muscular, melhorar a resistência, emagrecimento, etc.)', type: 'text' },
  { id: 7, question: 'Qual é o seu nível de atividade física? (Ex: Sedentário, Moderado, Ativo, Muito Ativo)', type: 'select', options: ['Sedentário', 'Moderado', 'Ativo', 'Muito Ativo'] },
  { id: 8, question: 'Você tem alguma condição médica relevante que possa impactar sua dieta ou treinamento?', type: 'text' },
  { id: 9, question: 'Você tem alguma alergia alimentar ou intolerância?', type: 'text' },
  { id: 10, question: 'Você tem alguma restrição alimentar? (Listar alimentos)', type: 'text' },
  { id: 11, question: 'Com que frequência você faz refeições por dia?', type: 'number' },
  { id: 12, question: 'Você segue um plano de treinamento atual? Se sim, qual é o foco principal?', type: 'text' },
  { id: 13, question: 'Qual é a frequência e duração típica dos seus treinos?', type: 'text' },
];

export function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string | number }>({});
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    questionRefs.current[currentQuestionIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentQuestionIndex]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [parseInt(name)]: questions[currentQuestionIndex].type === 'number' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questions[currentQuestionIndex].id]: value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
        console.log('Respostas:', answers);
        alert('Obrigado por responder o questionário!');
        navigate('/dashboard');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container>
      <Box mt={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        {questions.map((question, index) => (
          <Box
            key={question.id}
            ref={el => questionRefs.current[index] = el}
            sx={{
              opacity: index === currentQuestionIndex ? 1 : 0.5,
              transition: 'opacity 0.5s',
              mb: 4,
              display: 'block',
              width: '100%'
            }}
          >
            <Typography variant="h6" gutterBottom>
              {question.question}
            </Typography>
            {question.type === 'select' ? (
              <TextField
                fullWidth
                variant="outlined"
                select
                onChange={handleSelectChange}
                value={answers[question.id] || ''}
                sx={{ mb: 2 }}
              >
                {question.options?.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                variant="outlined"
                type={question.type}
                name={question.id.toString()}
                onChange={handleAnswerChange}
                value={answers[question.id] || ''}
                sx={{ mb: 2 }}
              />
            )}
            {index === currentQuestionIndex && (
              <Button variant="contained" color="primary" onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Concluir'}
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
}
