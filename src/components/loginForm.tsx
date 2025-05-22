import { useContext, useState } from "react"
import { AppContext } from "../context/appContext"
import type { AppContextType, usuarioType } from "../@types/app"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


interface IfLoginForm {
    handleLoginOk : () => void
}

export const LoginForm = (props: IfLoginForm) =>{

    const { updateNombre, updateCorreo, updateLoginOk } = useContext(AppContext) as AppContextType;

    const [nombre, setNombre] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");

    const handleChangeNombre = (event: React.ChangeEvent<HTMLInputElement>)  => {
        setNombre(event.target.value);
    }
    const handleChangeCorreo = (event: React.ChangeEvent<HTMLInputElement>)  => {
        setCorreo(event.target.value);
    }

    const handleLogin = () => {
        updateNombre(nombre);
        updateCorreo(correo);
        updateLoginOk(true);
        props.handleLoginOk();
    }

    return (
        <div className="flex flex-col border border-black rounded-md p-6 w-fit gap-4">
            <h1 className="text-2xl">Formulario</h1>
            <Input className="w-100" placeholder="Nombre" name="Nombre" value={nombre} onChange={handleChangeNombre} />
            <Input className="w-100" placeholder="Correo" name="Correo" value={correo} onChange={handleChangeCorreo} />
            <Button onClick={handleLogin} className="w-fit self-end" variant="outline">Enviar</Button>
        </div>
    );
}