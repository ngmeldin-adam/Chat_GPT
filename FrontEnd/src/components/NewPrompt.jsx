import {useEffect, useState , useRef} from 'react'
import arrow from '../Image/arrow.png'
import Upload from './Upload.jsx';
import model from "../lib/Gemini.js"
import { IKImage } from 'imagekitio-react';
import Markdown from 'react-markdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const Newprompt = ({data}) => {
    const [answer , setAnswer] = useState("")
    const [question , setQuestion] = useState("")
    const [img , setImg] =useState({ isLoading :false,
        error:"",
        dbData:{},
        aiData:{}
    })
    const chat = model.startChat({
        history:[
            data?.history.map(({role,parts})=>({
                role,
                parts:[{text:parts[0].text}]
            }))
        
        ],
        generationConfig:{
            // maxOutputTokens:100,
        },
    })
    const endRef = useRef(null)
    const formRef = useRef(null)

    useEffect(()=> {
        endRef.current.scrollIntoView({behavior:"smooth"});

    },[data,question , answer , img.dbData])

    const queryClient = useQueryClient()
    const mutaion = useMutation({
       mutationFn:()=>{
        return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`,{
            method:"PUT",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },  
            body:JSON.stringify({
                question: question.length ? question : undefined,
                answer ,
                img : img.dbData?.filePath || undefined
            })
        }).then(res => res.json())
       }  ,
       onSuccess:()=>{
        queryClient.invalidateQueries({queryKey :["chat",data._id]}).then(()=>{
          formRef.current.reset()
            setQuestion("")
            setAnswer("")
            setImg({ isLoading :false,
                error:"",
                dbData:{},
                aiData:{} 
        });
        });
    },
    onError:(err)=>{
        console.log(err)
    }
    })
    const add = async (text, isInitial)=> {
        if(!isInitial) setQuestion(text)
        try{
        const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text]:[text])
        let accumulatedText = "";
        for await (const chunk of result.stream){
            const chunkText = chunk.text();
            accumulatedText +=chunkText
            setAnswer(accumulatedText)
        }
        mutaion.mutate() 
      }catch(err){
        console.log(err)
      }
    }

    const handleSubmit = async(e)=> {
        e.preventDefault()
        const text = e.target.text.value;
        if(!text) return;
         add(text,false)
    }
    // in production we dont need this
    const hasRun = useRef(false)
 useEffect(()=>{
    if(!hasRun.current){
  if(data?.history?.length ===1){
    add(data.history[0].parts[0].text,true);
  }
} 
   hasRun.current = true;
 },[])
    return (
     <>
     {img.isLoading && <div>Loading...</div>}
     {
        img.dbData?.filePath && (
            <IKImage 
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            width="380"
            transformation={[{width:380}]}
            />
        )
     }
    
     {question && <div className=" p-[20px] max-sm:p-[15px] bg-[#2c2937]  rounded-[20px] max-w-[80%] max-sm:max-w-[70%]  self-end"> {question}</div>}
     {answer &&  (<div className="p-[20px] max-sm:p-[15px]"> <Markdown>{answer}</Markdown></div>)}

     <div className="pb-[90px]" ref={endRef}></div>
      <form ref={formRef}  className='w-[50%] max-sm:w-[35%] absolute bottom-0 bg-[#2c2937] rounded-[20px] flex items-center gap-[20px] max-sm:gap-[10px] py-[0] px-[20px] max-sm:px-[15px] '
      onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden className="flex-1 p-[20px] max-sm:p-[15px] border-none outline-none bg-transparent text-[#ececec]"  />
        <input type="text" name="text" placeholder="Ask anything..." className="max-sm:w-[90%] flex-1 p-[20px] max-sm:p-[15px] border-none outline-none bg-transparent text-[#ececec]" />
        <button className='rounded-[50%] bg-[#605e68] border-none
        p-[10px] flex items-center justify-center cursor-pointer'>
            <img src={arrow} alt="Error loading image"
            className="w-[15px] h-[15px] "  />
        </button>
      </form>
     </>
    )
}
export default Newprompt ;
