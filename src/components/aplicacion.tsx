import { AppContext } from "../context/appContext"
import type { AppContextType } from "../@types/app"
import { useContext } from "react"

export const Aplicacion = () =>{

    const {user } = useContext(AppContext) as AppContextType

    return (
        <div style={{display:"flex"}}>
            
            <p>El Usuario es : {user?.nombre}</p>
            

        </div>
    )
}