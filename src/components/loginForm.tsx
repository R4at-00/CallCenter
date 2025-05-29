import React, { useContext, useState } from "react"
import { AppContext } from "../context/appContext"
import type { AppContextType, DatosUsuarioAD, Tuser } from "../@types/app"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


interface IfLoginForm {

    handleClose: () => void
}

export const LoginForm = (props: IfLoginForm) => {

    const { updateUsuario } = useContext(AppContext) as AppContextType

    const [usuario, setUsuario] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    //  Variable de estado que avisa cuándo se está realizando el proceso de validación.
    const [validating, setValidating] = useState<boolean>(false)
    //  Se deduce que es una variable de estado que controla si se muestra un elemento por pantalla.
    const [errorVisible, setErrorVisible] = useState<boolean>(false)
    //  Variable de estado encargada de establecer el mensaje de error que se mostrará probablemente por consola.
    const [mensajeError, setMensajeError] = useState<string>("")

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleChangeNombreUsuario = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsuario(event.target.value)
    }

    //  Validar usuario
    const ValidaUsuario = async () => {
        //Preparar petición
        setValidating(true);
        setErrorVisible(false);

        const postData = {
            username: usuario,
            password: password,
        };

        //  Enviar petición y recibir respuesta
        async function ValidaUserAD(url: string) {
            try {
                const mensaje = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                })
                    .then((response) => response.json())
                    .then((data) => data);
                return mensaje;
            } catch {
                setMensajeError("Error de validación.");
                setValidating(false);
                setErrorVisible(true);
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////
        const url: string =
            "https://" +
            import.meta.env.VITE_REACT_APP_API_SERVER +
            ":" +
            import.meta.env.VITE_REACT_APP_API_PORT +
            "/api/v0/validate";
        //  Guardar respuesta
        const datosUsuario: DatosUsuarioAD = await ValidaUserAD(url);

        //  Validar información
        if (datosUsuario.error) {
            setMensajeError("Usuario/Password no validos");
            setErrorVisible(true);
            setValidating(false)
        } else {
            //Comprobar grupos
            console.log(JSON.stringify(datosUsuario))
            localStorage.setItem("tokenFace", datosUsuario.token);

            const user: Tuser = {
                loginUser: datosUsuario.usuario.sAMAccountName,
                nombre: datosUsuario.usuario.displayName,
                email: datosUsuario.usuario.userPrincipalName,
                admin: false
            };
            if(datosUsuario.grupos.find(grupo => grupo.cn === 'C07-G Call Center Usuarios')){
                user.admin = true;
            }

            updateUsuario(user);
            setValidating(false)
            props.handleClose();
        }
    }
    return (
        <div className="flex flex-col border border-black rounded-md p-6 w-fit gap-4 shadow-xl">
            <h1 className="text-2xl">Formulario</h1>
            <Input className="w-100" placeholder="Usuario" name="Usuario" value={usuario} onChange={handleChangeNombreUsuario} />
            <Input type="password" className="w-100" placeholder="Password" name="Password" value={password} onChange={handleChangePassword} />
            <Button disabled={validating} onClick={ValidaUsuario} className="w-fit self-end" variant="outline">Enviar</Button>
            {errorVisible && <div className="">{mensajeError}</div>}
        </div>
    );
}

//  c07-consul
//  consul2024
//  https://192.168.7.249:26025/api/v0/config/centros