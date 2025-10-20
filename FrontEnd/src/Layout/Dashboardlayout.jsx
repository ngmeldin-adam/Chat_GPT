import { Outlet, useNavigate } from "react-router-dom";
import {useAuth} from "@clerk/clerk-react"
import { useEffect } from "react";
import ChatList from "../components/Chatlist";

const DashboardLayout = () => {
    const {userId,isLoaded} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(isLoaded && !userId){
            navigate("/sign-in");
        }
    },[isLoaded , userId , navigate])

    if(!isLoaded) return "Loading..." ;
    return (
        <div className="flex gap-[50px] pt-[20px] max-sm:pt-[7px] h-full max-sm:gap-[10px]">
         <div className="flex-1"><ChatList /></div>
         <div className="flex-4 bg-[#12101b]">
            <Outlet />
         </div>
        </div>
    )
}

export default DashboardLayout ;