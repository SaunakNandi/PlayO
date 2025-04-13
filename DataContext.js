import { createContext,useState } from "react";

export const DataContext=createContext()

export const DataProvider=({children})=>{
        const [timeInterval,setTimeInterval]=useState("")
        const [taggedVenue,setTaggedVenue]=useState("")
        const [noOfPlayers,setnoOfPlayers]=useState(0)
        const [sport,setSport]=useState("")
        const [area,setArea]=useState("")
        const [date,setDate]=useState("")
    return(
        <DataContext.Provider value={{sport,setSport,area,setArea,date,setDate,timeInterval,setTimeInterval,taggedVenue,setTaggedVenue,noOfPlayers,setnoOfPlayers}}>
            {children}
        </DataContext.Provider>
    )
}