import { Outlet , Link} from "react-router-dom";
import logo from '../Image/logo.png'
import {ClerkProvider} from '@clerk/clerk-react'
import {SignedIn , UserButton} from "@clerk/clerk-react"
import { QueryClient,QueryClientProvider} from '@tanstack/react-query';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 if(!PUBLISHABLE_KEY){
    throw new Error("Missing Bublishable Key")
 }
 const queryClient = new QueryClient();
const Rootlayout = () => {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" >
        <QueryClientProvider client={queryClient}>
        <div className="py-[16px] px-[64px] h-screen flex flex-col max-sm:px-[10px] max-sm:py-[10px]">
         <header className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-[8px] font-bold">
            <img className="h-[32px] w-[32px]" src={logo} alt="error" />
            <span className="">Lemon AI</span>
            </Link>
            <div className="user">
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
         </header>
         <main className="flex-1 overflow-hidden">
            <Outlet />
         </main>
        </div>
        </QueryClientProvider>
        </ClerkProvider>
    )
}

export default Rootlayout  ;