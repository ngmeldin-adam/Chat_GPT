import Logo from '../Image/logo.png'
import Chat from '../Image/chat.png'
import image from '../Image/image.png'
import Code from '../Image/code.png'
import Arrow from '../Image/arrow.png'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
       mutationFn:(text)=>{
        return fetch(`${import.meta.env.VITE_API_URL}/api/chats`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },  
            body:JSON.stringify({text})
        }).then(res => res.json())
       }  ,
       onSuccess:(id)=>{
        queryClient.invalidateQueries({queryKey :["userChats"]});
       navigate(`/dashboard/chats/${id}`)
    } 
    })
    
    const handleSubmit = async(e)=> {
        e.preventDefault();
        const text = e.target.text.value;
        if(!text) return;
     mutation.mutate(text)
    }
    return (
    <div className="h-full flex flex-col max-sm:items-start items-center ">
     <div className="flex-1 flex flex-col items-center justify-center 
     w-[50%] max-sm:gap-[30px] gap-[50px] ">
        <div className="flex  max-sm:items-start items-center max-sm:gap-[10px] gap-[20px]  opacity-[0.2]">
           <img src={Logo} alt="Error" className='w-[64px] h-[64px]' />
           <h1 className='text-[64px] max-sm:text-[45px] font-bold bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text
           text-transparent '>Lemon AI</h1>
        </div>
        <div className="w-full flex items-center justify-between gap-[50px] max-sm:gap-[20px]"> 
            <div className="option">
                <img src={Chat} alt="Error" className='max-sm:h-[30px] w-[40px] h-[40px] object-cover' />
                <span className="capetalize">create a new chat</span>
            </div>
            <div className=" option">
                <img src={image} alt="Error" className='w-[40px] h-[40px] object-cover'  /> 
                <span className="capetalize">analyze images</span>
            </div>
            <div className="option">
                <img src={Code} alt="Error" className='w-[40px] h-[40px] object-cover'  />
                <span className="capetalize">help me with my code</span>
            </div>
        </div>
     </div>
          <div className="mt-auto max-sm:w-[90%] w-[50%]  bg-[#2c2937] rounded-[20px] flex"> 
            <form action="" onSubmit={handleSubmit} className="w-full h-full flex items-center  justify-between gap-[20px] max-sm:gap-[10px] mb-[10px]">
                <input type="text"name="text" placeholder='ask me anything...' className='flex-[1] p-[20px] bg-transparent border-none outline-none text-[#ececec]' />
                <button className="bg-[#605e68] rounded-[50%] border-none cursor-pointer p-[10px] 
                flex items-center justify-center max-sm:mr-[10px] mr-[20px] ">
                    <img src={Arrow} alt="Error" className="w-[16px] h-[16px]" />
                </button>
            </form>
          </div>
        </div>
    )
}

export default Dashboard ;