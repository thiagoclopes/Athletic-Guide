import { RouterProvider } from "react-router-dom";
import { router } from './routes'
import './global.css'
import { Header } from "./components/header";
import { SideBar } from "./components/drawer";

export function App() {
  
  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      <SideBar />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, overflow: 'auto', padding: '15px' }}>
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}