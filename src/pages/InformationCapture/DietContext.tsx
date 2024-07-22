import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { DietDataProps, QuestionnaireData, createDiet} from "./CreatingDiet";

interface DietContextType {
    diet: DietDataProps | null;
    setDiet: (data: QuestionnaireData) => void; // Tipo correto aqui
  }
  
const DietContext = createContext<DietContextType | undefined>(undefined);

export const DietProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const [diet, setDietState] = useState<DietDataProps | null>(null);

useEffect(() => {
    const storedDiet = localStorage.getItem('diet');
    if (storedDiet) {
      setDietState(JSON.parse(storedDiet));
    }
  }, []);

console.log(diet)

const updateDiet = async (questionnaireData: QuestionnaireData) => {
    try {
      const newDiet = await createDiet(questionnaireData);
      setDietState(newDiet);
      localStorage.setItem('diet', JSON.stringify(newDiet)); 
    } catch (error) {
      console.error('Failed to fetch diet:', error);
    }
  }

    return (
    <DietContext.Provider value={{ diet, setDiet: updateDiet }}>
        {children}
    </DietContext.Provider>
    );
};
  

  // eslint-disable-next-line react-refresh/only-export-components
  export const useDiet = () => {
    const context = useContext(DietContext);
    if (context === undefined) {
      throw new Error('useDiet must be used within a DietProvider');
    }
    return context;
  };