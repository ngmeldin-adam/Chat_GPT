import {Link} from 'react-router-dom'
import Logo from '../Image/logo.png'
import { useQuery } from '@tanstack/react-query'

const ChatList = () =>{

    const {isPending , error , data} = useQuery({
        queryKey:["userChats"],
        queryFn:()=>
            fetch(`https://lemon-ai-nato.onrender.com/api/userchats`,{
                    credentials:"include",
                }
            ).then((res) => res.json())
    })
    return(
        <div className="flex flex-col h-full ">
            <span className='font-600 text-[11px] mb-[10px]'>DASHBOARD</span>
            <Link to='/dashboard' className="p-[10px] rounded-[10px] text-[15px] max-sm:text-[13px] hover:bg-[#2c2937]">Create a New Chat</Link>
            <Link to='/' className="p-[10px] rounded-[10px] hover:bg-[#2c2937] max-sm:text-[13px] ">Explore Ngmo AI</Link>
            <Link to='/' className="p-[10px] rounded-[10px] hover:bg-[#2c2937] max-sm:text-[13px] ">Contact</Link>
            <hr className="border-none h-[2px] bg-[#ddd]
           opacity-[0.1] rounded-[5px] my-[20px] mx-[0px] "/>
           <span className="font-600 text-[11px] mb-[10px]">RECENT CHATS</span>
            <div className="flex flex-col overflow-scroll">
              { isPending ?
               "Loading..." : error ? "semthing went wront " 
              : data?.map((chat)=>(
               <Link to={`/dashboard/chats/${chat._id}`} key={chat._id} className="p-[10px] rounded-[10px] :h-bg-[#2c2937]">{chat.title}</Link>
              ))}
      
            </div>
            <hr className='border-none h-[2px] bg-[#ddd]
           opacity-[0.1] rounded-[5px] my-[20px] mx-[0px]'/>
            <div className="mt-auto flex items-center gap-[10px] text-[12px]">
                <img src={Logo} alt="Error" className='w-[24px] h-[24px]'/>
                <div className="flex flex-col">
                    <span className="f-600">Upgrade To Ngmo AI</span>
                    <span className="text-[#888]">Get Ublimited Access To All Features</span>
                </div>
            </div>
        </div>
    )
}

export default ChatList;
