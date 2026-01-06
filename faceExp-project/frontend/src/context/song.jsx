import { Children, createContext, useState } from "react";

export const SongContext = createContext()

export function SongContextWrapper ({children}) {

    const [Song, setSong] = useState([

    ])

    return(

        <SongContext.Provider value={{Song , setSong}}>
            {children}
        </SongContext.Provider>
    )
}