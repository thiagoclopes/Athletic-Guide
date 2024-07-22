import { RefeicaoTipo } from "./InformationCapture/CreatingDiet";
import { useDiet } from "./InformationCapture/DietContext";


export function MealPlan() {
    const { diet } = useDiet();
    console.log(diet)
    const safeDiet = diet || {
        objetivo_calorico: 'Não disponível',
        necessidades_caloricas_diarias_para_objetivo: 0,
        plano_de_refeicoes_diarias: {
          total_de_refeicoes: 0,
          calorias_por_refeicao: 0,
        },
        necessidades_diarias_de_macronutrientes: {
          proteinas: 'Não disponível',
          carboidratos: 'Não disponível',
          gorduras: 'Não disponível',
        },
        exemplo_de_plano_de_refeicoes: {
          cafe_da_manha: { alimentos: [] },
          lanche_da_manha: { alimentos: [] },
          almoco: { alimentos: [] },
          lanche_da_tarde: { alimentos: [] },
          jantar: { alimentos: [] },
        },
      };

    return(
        <div>
            <h1>Plano de Alimentação</h1>
            <h2>Objetivo Calórico</h2>
            <p>{safeDiet.objetivo_calorico}</p>

            <h2>Necessidades Calóricas Diárias para Objetivo</h2>
            <p>{safeDiet.necessidades_caloricas_diarias_para_objetivo} calorias</p>

            <h2>Plano de Refeições Diárias</h2>
            <p>Total de Refeições: {safeDiet.plano_de_refeicoes_diarias.total_de_refeicoes}</p>
            <p>Calorias por Refeição: {safeDiet.plano_de_refeicoes_diarias.calorias_por_refeicao}</p>

            <h2>Necessidades Diárias de Macronutrientes</h2>
            <p>Proteínas: {safeDiet.necessidades_diarias_de_macronutrientes.proteinas}</p>
            <p>Carboidratos: {safeDiet.necessidades_diarias_de_macronutrientes.carboidratos}</p>
            <p>Gorduras: {safeDiet.necessidades_diarias_de_macronutrientes.gorduras}</p>

            <h2>Exemplo de Plano de Refeições</h2>
            {Object.keys(safeDiet.exemplo_de_plano_de_refeicoes).map((refeicao) => {
            const refeicaoTipo = refeicao as RefeicaoTipo;
            const alimentos = safeDiet.exemplo_de_plano_de_refeicoes[refeicaoTipo]?.alimentos;

            return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                <div key={refeicaoTipo}>
                <h3>{refeicaoTipo.replace('_', ' ').toUpperCase()}</h3>
                <ul>
                    {alimentos?.map((alimento, index) => (
                    <li key={index}>
                        {alimento.nome} - {alimento.quantidade}
                    </li>
                    ))}
                </ul>
                </div>
            );
            })}
    </div>
  )
}