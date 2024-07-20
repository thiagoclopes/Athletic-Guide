import { RouterProvider } from "react-router-dom";
import { router } from './routes'
import './global.css'
import { Header } from "./components/header";
import { SideBar } from "./components/drawer";

export function App() {
  
  return (
    <div className="App" style={{ padding: '0px', fontFamily: 'Arial, sans-serif' }}>
      <SideBar />
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}