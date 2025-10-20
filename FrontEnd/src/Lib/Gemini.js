import {GoogleGenerativeAI , HarmBlockThreshold , HarmCategory} from "@google/generative-ai"


const safetySetting = [
    {
        catergory:HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold:HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
       catergory:HarmCategory.HARM_CATEGORY_HATE_SPEECH,
       threshold:HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
]
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_PUBLIC_KEY)
const model = genAI.getGenerativeModel({model:"gemini-2.5-flash",safetySetting})





export default model;