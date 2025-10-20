import {Link} from 'react-router-dom'
import Bot from "../Image/bot.png";
import {TypeAnimation} from "react-type-animation"
import { useState } from 'react';
import Logo from '../Image/logo.png'
import Orbital from '../Image/orbital.png'

const Home = () => {
    const [typingStatus , setTypingStatus] = useState("human1")
    return (
        <div className="flex  items-center gap-[100px] h-full
          max-flex-col  max-sm:gap-[0px]">
            <img src={Orbital} alt="Error" 
            className='absolute bottom-[0] left-[0] opacity-[0.05] z-[-1] animate-rotateOrbital' />
        <div className="flex-1 flex flex-col items-center justify-center gap-[16px] text-center">
           <h1 className=" max-sm:text-[85px] text-[128px] bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent
           max-font-[64px]  font-bold">Lemon AI</h1>
           <h2 className="font-bold  capetalize text-[25px] max-sm:text-[22px]">supercharge your creativity and productivity</h2>
           <h3 className='font-[400] max-w-[70%] text-[15px] 
           capitalize max-w-full'>with our search engine we can help you in 
          Get answers. Find inspiration. Be more productive</h3>
           <Link to="/dashboard" className="Link">get started</Link>
         </div>
         {/* End Left */}
        <div className=" max-sm:hidden flex-1 flex items-center justify-center h-full ">
         <div className="flex items-center justify-center bg-[#140e2d] rounded-[50px]
          h-[50%] w-[80%]  relative">
            <div className="w-full h-full overflow-hidden absolute top-0 left-0 rounded-[50px]">
      
                <div className="bg-[url(bg.png)] opacity-[0.2] w-[200%] h-full bg-auto-full
                animate-slideBg"></div>
            </div>
            <img  src={Bot} alt="Error" className='w-full h-full object-contain
            animate-botAnimation' />
            <div className="absolute bottom-[-30px] right-[-50px] flex items-center gap-[10px]
            p-[20px] bg-[#2c2937] rounded-[10px]  max-w-none max-w-right-[0]
            ">
                <img src={typingStatus === "human1" ? "human1.jpeg" : typingStatus === 'human2' ? "human2.jpeg":
                 "bot.png"} className="w-[32px] h-[32px] rounded-[50%] object-cover" />
                <TypeAnimation
                sequence={[
                 "Human: we produce food for mice",
                 2000,()=>{
                    setTypingStatus("bot")
                 },
                 "Bot: we produce food for hamsters",
                 2000,()=>{
                    setTypingStatus("human2")
                 },
                 "Human2: we produce food for ngm",
                 2000, ()=>{
                    setTypingStatus("bot")
                 },
                 "Bot: we produce food for shinchillas",
                 2000,()=>{
                    setTypingStatus("human1")
                 },
                ]}
                wrapper="span"
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                />
            </div>
         </div>
        </div>
        <div className="absolute bottom-[20px] max-sm:bottom-[5px] left-[50%] translate-x-[-50%]
        flex flex-col items-center gap-[20px]">
            <img src={Logo} alt="" className='w-[16px] h-[16px] ml-[-15px]' />
            <div className="flex gap-[10px] max-sm:gap-[5px] text-[#888] font-[14px] capitalize">
               <Link to="/">terms of sercice</Link>
               <span>|</span>
               <Link to="/">privacy and policy</Link>
            </div>
        </div>
        </div>
    )
}

export default Home ;