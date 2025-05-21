
import React, {  useState } from 'react';
import type { AppContextType, usuarioType } from '../@types/app';

export const AppContext = React.createContext<AppContextType | null>(null)


const AppProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [loginOk, setLoginOk] = useState<boolean>(false)
    const [user, setUser] = useState<usuarioType>(undefined)

    const updateLoginOk = (v: boolean) => {
        setLoginOk(v)
    }
      const updateUser = (u: usuarioType) => {
        setUser(u)
    }

    return(
        <AppContext.Provider
            value={{
                user,
                loginOk,
                updateLoginOk,
                updateUser
            }}
            >
                {children}
            </AppContext.Provider>
    )


}

export default AppProvider



