
import React, {  useState } from 'react';
import type { AppContextType, usuarioType } from '../@types/app';

export const AppContext = React.createContext<AppContextType | null>(null)


const AppProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [loginOk, setLoginOk] = useState<boolean>(false);
    const [usuario, setUsuario] = useState<usuarioType>(undefined);

    const updateUsuario = (u: usuarioType) => {
        setUsuario(u);
    }
    const updateNombre = (u: string) => {
        setUsuario((prev:any) => ({...prev, nombre: u }));
    }
    const updateCorreo = (u: string) => {
        setUsuario((prev:any) => ({...prev, correo: u }));
    }
    const updateLoginOk = (v: boolean) => {
        setLoginOk(v)
    }
    return (
        <AppContext.Provider 
            value={{
                loginOk,
                usuario,
                updateUsuario,
                updateNombre,
                updateCorreo,
                updateLoginOk
            }}
        >
            {children}
        </AppContext.Provider>
    )


}

export default AppProvider



