import { Outlet } from "react-router-dom";
export function RegistrationLayout() {
    return(
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <div style={{ flex: 1, overflow: 'auto', paddingTop: '48px' }}>
            <Outlet />
            </div>
        </div>
    </div>
    )
}