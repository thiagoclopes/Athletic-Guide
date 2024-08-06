import { Outlet } from "react-router-dom";
import { SideBar } from "../../components/drawer";
import { Header } from "../../components/header";

export function AppLayout() {
    return (
      <div className="App flex flex-row h-screen">
        <SideBar />
        <div className="flex flex-col flex-1 mr-2">
          <Header />
          <div className="flex-1 overflow-auto pt-4">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }