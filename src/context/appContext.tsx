import React, { useState } from 'react';
import type { AppContextType, Tcentro, Tuser } from '../@types/app';

export const AppContext = React.createContext<AppContextType | null>(null)

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Tuser>(undefined);
    const [centrosUsuario, setCentrosUsuario] = useState<Tcentro[]>([]);
    const [centros, setCentros] = useState<Tcentro[]>([]);
    
    const updateUsuario = (u: Tuser) => {
        setUsuario(u);
    }
    const updateCentrosUsuario = (u: Tcentro[]) => {
        setCentrosUsuario(u);
    }
    const updateCentros = (u: Tcentro[]) => {
        setCentros(u);
    }
    return (
        <AppContext.Provider
            value={{
                usuario,
                loginOk: false,
                centros,
                centrosUsuario,
                tiposEstructura: [],
                tiposDocumentacion: [],
                periodicidades: [],
                tiposFactura: [],
                tiposEnvio: [],
                numeroProcesos: 0,
                numeroDocumentos: 0,

                updateUsuario,
                updateLoginOk: () => { },
                updateCentros,
                updateCentrosUsuario,
                updateTiposEstructura: () => { },
                updateTiposDocumentacion: () => { },
                updatePeriodicidades: () => { },
                updateTiposFactura: () => { },
                updateNumeroProcesos: () => { },
                updateNumeroDocumentos: () => { },
                updateTiposEnvio: () => { },
            }}
        >
            {children}
        </AppContext.Provider>
    )


}

export default AppProvider



