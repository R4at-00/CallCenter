export type usuarioType = | {
    nombre: string,
    correo: string
}  |undefined

export type AppContextType = {
    loginOk : boolean
    usuario: usuarioType
    updateUsuario: (u:TUsuario) => void;
    updateNombre: (u:string) => void;
    updateCorreo: (u:string) => void;
    updateLoginOk: (v: boolean) => void
}

