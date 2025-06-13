import React, { useState } from 'react';
import type { AppContextType, incidencia, Tuser } from '../@types/app';

export const AppContext = React.createContext<AppContextType | null>(null)

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Tuser>(undefined);
    const [usuarioNick, setUsuarioNick] = useState<string>('');
    const [incidencias, setIncidencias] = useState<Array<incidencia>>([]);
    const [replyDialogActive, setReplyDialogActive] = useState<boolean>(false);
    const [replyDialogId, setReplyDialogId] = useState<string>('');

    const updateUsuario = (u: Tuser) => {
        setUsuario(u);
    }
    const updateUsuarioNick = (u: string) => {
        setUsuarioNick(u);
    }
    const updateIncidencias = (newArrayIncidencias: incidencia[]) => {
        setIncidencias(newArrayIncidencias);
    }

    return (
        <AppContext.Provider
            value={{
                usuario,
                usuarioNick,
                incidencias,
                replyDialogActive,
                replyDialogId,
                updateUsuario,
                updateUsuarioNick,
                updateIncidencias,
                setReplyDialogActive,
                setReplyDialogId,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider



