import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";
export function RegistrationLayout() {
    return(
        <div className="flex flex-col items-center h-screen">
            <Header/>
            <div className="mt-8 mb-8 bg-slate-400 w-full h-full max-w-4xl p-8 flex justify-center items-center">
                <Outlet />
            </div>
        </div>
    )
}