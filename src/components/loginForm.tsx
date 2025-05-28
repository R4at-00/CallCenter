import React, { useContext, useState } from "react"
import { AppContext } from "../context/appContext"
import type { AppContextType, DatosUsuarioAD, Tcentro } from "../@types/app"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


interface IfLoginForm {
    handleLoginOk: () => void
}

export const LoginForm = (props: IfLoginForm) => {
    const { updateNombre, updateLoginOk } = useContext(AppContext) as AppContextType

    const [nombre, setNombre] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [validating, setValidating] = useState<boolean>(false)
    const [errorVisible, setErrorVisible] = useState<boolean>(false)
    const [mensajeError, setMensajeError] = useState<string>("")

    const handleChangeNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    }
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        // updateNombre(nombre);
        // updatePassword(password);
        // updateLoginOk(true);

        //Validar usuario
        const ValidaUsuario = async (e: React.SyntheticEvent) => {
            e.preventDefault();

            const target = e.target as typeof e.target & {
                username: { value: string };
                password: { value: string };
            };

            setValidating(true);
            setErrorVisible(false);

            const postData = {
                username: target.username.value,
                password: target.password.value,
            };

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

            const datosUsuario: DatosUsuarioAD = await ValidaUserAD(url);

            if (datosUsuario.error) {
                setMensajeError("Usuario/Password no validos");
                setErrorVisible(true);
            } else {
                //Comprobar grupos
                localStorage.setItem("tokenFace", datosUsuario.token);
                let tieneCentro: boolean = false;
                let contador = 0;
                let nombreGrupo = "";

                updateCentrosUsuario([]);
                const lCentros: Tcentro[] = [];
                datosUsuario.grupos.map((grupo) => {
                    if (grupo.cn.toUpperCase().includes("-G-APP-FACE")) {
                        contador = contador + 1;
                        tieneCentro = true;
                        nombreGrupo = grupo.cn.toUpperCase();

                        //Buscar datos del centro en lista de centros'

                        const centro = centros.find(
                            (c) => c.XKEY === nombreGrupo.substring(1, 3)
                        );

                        if (centro !== undefined) {
                            lCentros.push(centro);
                        }
                    }
                });

                if (!tieneCentro) {
                    setMensajeError("No tiene permisos de acceso a la aplicación.");
                    setErrorVisible(true);
                } else {
                    const user: Tuser = {
                        loginUser: datosUsuario.usuario.sAMAccountName,
                        nombre: datosUsuario.usuario.displayName,
                        email: datosUsuario.usuario.userPrincipalName,
                        codCentro: "",
                        desCentro: "",
                        facility: 0,
                        scope: 0,
                        repo: "",
                        cert: "",
                        alias: "",
                    };
                    updateUser(user);

                    if (contador > 1) {
                        updateCentrosUsuario(lCentros);
                        setCurrentUser(user);
                        setMensajeError("El usuario tiene mas de un centro asignado.");
                        setErrorVisible(true);
                        setDialogCentroVisible(true);
                    } else {
                        const centroSel: Tcentro | undefined = centros.find(
                            (c) => c.XKEY === nombreGrupo.substring(1, 3)
                        );

                        user.codCentro = nombreGrupo.substring(1, 3);
                        user.desCentro = centroSel.DESCRIPCION;
                        user.facility = centroSel.FACILITY;
                        user.scope = centroSel.SCOPE;
                        user.repo = centroSel.RUTA_DOCUMENTACION;
                        user.cert = centroSel.CERT_PASS;
                        user.alias = centroSel.ALIAS_CERT;

                        updateUser(user);

                        props.handleClose();
                    }
                }
            }
            setValidating(false);
        };
    }

    return (
        <div className="flex flex-col border border-black rounded-md p-6 w-fit gap-4 shadow-xl">
            <h1 className="text-2xl">Formulario</h1>
            <Input className="w-100" placeholder="Usuario" name="Usuario" value={nombre} onChange={handleChangeNombre} />
            <Input className="w-100" placeholder="Password" name="Password" value={password} onChange={handleChangePassword} />
            <Button onClick={handleLogin} className="w-fit self-end" variant="outline">Enviar</Button>
        </div>
    );
}