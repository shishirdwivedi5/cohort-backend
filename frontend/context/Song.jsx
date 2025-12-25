import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongProvider = ({children})=>{

    const [Audio, setAudio] = useState([
        
    ])
    return(
        <SongContext.Provider value={{Audio,setAudio}}>
            {children}
        </SongContext.Provider>

    )
}