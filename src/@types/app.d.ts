export type usuarioType = | {
    nombre: string,
    password: string
}  | undefined

export type AppContextType = {
    loginOk : boolean
    usuario: usuarioType
    updateUsuario: (u:TUsuario) => void
    updateNombre: (u:string) => void
    updateLoginOk: (v: boolean) => void
}

export type DatePickProps = {
    name: string
}

export type DatosUsuarioAD = {
	usuario: {
		sAMAccountName: string;
		displayName: string;
		userPrincipalName: string;
	};

	grupos: [
		{
			grupo: string;
			cn: string;
		}
	];
	error: boolean;
	token: string;
};

export type Tcentro = {
	FACILITY: number;
	XKEY: string;
	SCOPE: number;
	RUTA_DOCUMENTACION: string;
	DESCRIPCION: string;
	NIF?: string;
	DIRECCION?: string;
	CODPOSTAL?: string;
	CIUDAD?: string;
	PROVINCIA?: string;
	CODPAIS?: string;
	TELEPHONE?: string;
	FAX?: string;
	WEBPAGE?: string;
	IBAN?: string;
	EMAIL?: string;
	EMAIL_NOTIFICACIONES?: string;
	PERSONA_CONTACTO: string;
	DATOS_CONTACTO: string;
	TEXTO_IMPUESTO: string;
	CERT_PASS: string;
	ALIAS_CERT: string;
};
