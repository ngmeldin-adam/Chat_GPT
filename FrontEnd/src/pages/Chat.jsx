
import { useQuery } from '@tanstack/react-query';
import Newprompt from '../components/NewPrompt'
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';
const Chat = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop()
  const {isPending , error , data} = useQuery({
    queryKey:["chat",chatId],
    queryFn:()=>
        fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,
            {
                credentials:"include"
            }
        ).then((res) => res.json())
        
})

console.log(data);

    return (
        <div className="h-full  flex flex-col max-sm:items-start  max-sm:ml-[10px] items-center relative ">
          <div className=" flex-1 overflow-scroll max-sm:w-[70%] w-full flex  max-sm:justify-start max-md:justify-start justify-center ">
            <div className="w-[50%]  flex flex-col  gap-[20px] max-sm:gap-[10px] [&_p]:my-2.5 [&_li]:my-2.5">
            {isPending 
            ? "Loading..."
              : error
              ?"something went wrong" :
            data?.history?.map((message,i)=>(
               <>
               {message.img && (
                <IKImage
                urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                path={message.img}
                height="300"
                width="400"
                transformation={[{height:300,width:400}]}
                loading='lazy'
                lqip={{active:true,quality:20}}
                />
               )}
              <div className={message.role === "bg-[#2c2937] rounded-[20px] max-sm:max-w-[70%] max-w-[80%]  self-end" ? " p-[20px] max-sm:p-[10px] bg-[#2c2937] rounded-[20px] max-sm:max-w-[70%] max-w-[80%] self-end":" p-[20px] max-sm:p-[10px]"} 
               key={i}> 
                 <Markdown>
                 {message.parts[0].text}
                </Markdown>
              </div>
              </>
              
            ))}
            
           
            {data && <Newprompt data={data}/>}
              
            </div>
          </div>
        </div>
    )
}

export default Chat ;