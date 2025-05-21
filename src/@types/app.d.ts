export type usuarioType = | {
    nombre: string,
    correo: string
}  |undefined

export type AppContextType = {
    loginOk : boolean
    user: usuarioType
    updateLoginOk: (v: boolean) => void
    updateUser: (u: usuarioType) => void
}

