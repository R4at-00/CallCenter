import { AppContext } from "../context/appContext"
import type { AppContextType } from "../@types/app"
import { useContext } from "react"

export const Aplicacion = () =>{

    const { usuario } = useContext(AppContext) as AppContextType;

    return (
        <div>
            <p>El Usuario {usuario?.nombre}, con el correo {usuario?.password}.</p>
        </div>
    )
}