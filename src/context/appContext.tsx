import React, { useState } from 'react';
import type { AppContextType, Tuser } from '../@types/app';

export const AppContext = React.createContext<AppContextType | null>(null)

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [usuario, setUsuario] = useState<Tuser>(undefined);
    
    const updateUsuario = (u: Tuser) => {
        setUsuario(u);
    }
    return (
        <AppContext.Provider
            value={{
                usuario,
                updateUsuario,
            }}
        >
            {children}
        </AppContext.Provider>
    )


}

export default AppProvider



