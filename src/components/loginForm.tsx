import { useContext, useState } from "react"
import { AppContext } from "../context/appContext"
import type { AppContextType, usuarioType } from "../@types/app"


interface IfLoginForm {
    handleLoginOk : () => void
}


export const LoginForm = (props: IfLoginForm) =>{

    const {updateUser, updateLoginOk} = useContext(AppContext) as AppContextType
    
    const [usuario, setUsuario] = useState<string>("")

    const handleCambiaUsuario = (e: React.ChangeEvent<HTMLInputElement>)  => {
        setUsuario(e.target.value)
    }

    const handleLogin = () => {

        const newUser : usuarioType =  {nombre: usuario, correo:""}
        updateUser(newUser)
        updateLoginOk(true)
        props.handleLoginOk()
    }

    return (
        <div style={{display:"flex"}}>
            
            <p>Usuario:</p>
            <input type="text" value={usuario} onChange={(e) => handleCambiaUsuario(e)} />
            <button onClick={() => handleLogin() }> login usuario</button>
        </div>
    )
}