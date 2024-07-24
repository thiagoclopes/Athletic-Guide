import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
interface FoodItem {
  nome: string;
  quantidade: number;
  proteina: number;
  carboidrato: number;
  gordura: number;
}


interface MealPlanTableProps {
  foodItems: FoodItem[];
  title: string
}


export function MealPlanTable( { foodItems, title }:MealPlanTableProps, ) {

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        { title }
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="meal plan table">
          <TableHead>
            <TableRow>
              <TableCell>Alimento</TableCell>
              <TableCell align="right">Quantidade (g)</TableCell>
              <TableCell align="right">Proteínas (g)</TableCell>
              <TableCell align="right">Carboidratos (g)</TableCell>
              <TableCell align="right">Gorduras (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodItems.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.nome}
                </TableCell>
                <TableCell align="right">{item.quantidade}</TableCell>
                <TableCell align="right">{item.proteina}</TableCell>
                <TableCell align="right">{item.carboidrato}</TableCell>
                <TableCell align="right">{item.gordura}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}