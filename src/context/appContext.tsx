import React, { useState } from 'react';
import type { AppContextType, incidencia, Tuser } from '../@types/app';

export const AppContext = React.createContext<AppContextType | null>(null)

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Tuser>(undefined);
    const [usuarioNick, setUsuarioNick] = useState<string>('');
    const [incidencias, setIncidencias] = useState<Array<incidencia>>([]);

    const updateUsuario = (u: Tuser) => {
        setUsuario(u);
    }
    const updateUsuarioNick = (u: string) => {
        setUsuarioNick(u);
    }
    const updateIncidencias = (newArrayIncidencias: incidencia[]) => {
        setIncidencias(newArrayIncidencias);
        // console.log(incidencias)
    }

    const handleNewIncidencia = (newIncidencia : incidencia): void => {
        setIncidencias(prevIncidencias => [...prevIncidencias, newIncidencia])
    }

    return (
        <AppContext.Provider
            value={{
                usuario,
                usuarioNick,
                incidencias,
                updateUsuario,
                updateUsuarioNick,
                updateIncidencias,
                handleNewIncidencia
            }}
        >
            {children}
        </AppContext.Provider>
    )


}

export default AppProvider



