import { Outlet } from "react-router-dom";
import { SideBar } from "../../components/drawer";
import { Header } from "../../components/header";

export function AppLayout() {
    return(
    <div className="App" style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <SideBar />
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <Header />
            <div style={{ flex: 1, overflow: 'auto', paddingTop: '48px' }}>
            <Outlet />
            </div>
        </div>
    </div>
    )
}