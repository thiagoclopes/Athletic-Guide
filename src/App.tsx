import { RouterProvider } from "react-router-dom";
import { router } from './routes'
import './global.css'
import { Header } from "./components/header";

export function App() {
  
  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}