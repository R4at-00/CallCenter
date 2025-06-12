export type Tuser =
	| {
			loginUser: string;
			nombre: string;
			email: string;
			admin: boolean;
	  }
	| undefined;

export type AppContextType = {
	usuario: Tuser;
	usuarioNick: string;
	incidencias: incidencia[];
	replyDialogActive: boolean;
	replyDialogId: string;
	updateUsuario: (u: Tuser) => void;
	updateUsuarioNick: (u: string) => void;
	updateIncidencias: (u: incidencia[]) => void;
	setReplyDialogActive: React.Dispatch<React.SetStateAction<boolean>>;
	setReplyDialogId: React.Dispatch<React.SetStateAction<string>>
};

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

export type incidencia = {
    id: string;
    NHC: string;
    Fecha: string;
    Incidencia: string;
    Estado: string;
    Responsable: string;
    Prioridad: string;
    Clasificacion: string;
	Respuesta: string;
};

export type nuevaIncidencia = Omit<incidencia, 'id'>;

export type coord = {
  x: number,
  y: number
}

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

export type TSidDesc = {
	SID: number;
	DESCRIPCION: string;
};

export interface IProcesos {
	FACILITY: number;
	SID: number;
	XKEY: string;
	DESCRIPCION_CORTA: string;
	DESCRIPCION_LARGA: string;
	ENTIDADES: string;
	ESTRUCTURA_REPO: string;
	ESTRUCTURA_OTRA: string;
	DOCUMENTACION_OBL: string;
	DOCUMENTACION_OTRA: string; //documentacion asociada al procesi
	GENERACION_AUT_SN: string;
	PERIODICIDAD: string;
	PERIODICIDAD_OTRA: string;
	TIPO_FACTURA: string; //Una por paciente / Una por grupo de pacientes
	OTRO_TIPO_FACTURA: string;
	INCORPORAR_LINEAS_SN: string;
	OTRO_TIPO_LINEAS: string;
	MULTIPLES_DIRECCIONES_SN: string;
	OBSERVACIONES: string;
}

export type TDocumento = {
	SID_ENTIDAD: number;
	SID_DOCUMENTO: number;
	DESCRIPCION: string;
};

export type TEntidad = {
	SID: number;
	FACILITY: number;
	TICARES_SN: string;
	SID_TICARES?: number;
	XKEY_TICARES?: string;
	NIF?: string;
	CIF?: string;
	DESCRIPTION_TICARES: string;
	DESCRIPTION: string;
	ALIAS?: string;
	DIRECCION?: string;
	CODPOSTAL?: string;
	CIUDAD?: string;
	PROVINCIA?: string;
	CODPAIS?: string;
	DIRECCION_TICARES?: string;
	CODPOSTAL_TICARES?: string;
	CIUDAD_TICARES?: string;
	PROVINCIA_TICARES?: string;
	CENTROS: string;
	TELEFONO: string;
	REPOSITORIO: string;
	PERSONA_CONTACTO: string;
	EMAIL_CONTACTO: string;
	FACTURAS?: number;
	DOCUMENTOS_OBL?: TDocumento[];
	SOLO_REMESAS: string;
	TIPO_ENVIO: string;
	OBSERVACIONES: string;
};
export type TCentroAdm = {
	SID?: number;
	ROL: string;
	CODIGO: string;
	NOMBRE: string;
	DIRECCION: string;
	CIUDAD: string;
	PROVINCIA: string;
	CODPOSTAL: string;
	COD_PAIS: string;
	ACTIVO_SN: string;
};

export type TTarifa = {
	SID_ENTIDAD: number;
	SID_ET: number;
	XKEY: string;
	DESCRIPCION: string;
};

export type TFactura = {
	FACILITY: number;
	SID_ENTIDAD: number;
	XKEY: string;
	SCOPE: number;
	NHC: number;
	ORDER_NUMBER: number;
	LINEAS: number;
	NUMBER_OF_INVOICE: number;
	XDATE: Date;
	OPERATION_DATE: Date;
	INVOICE_STATUS: number;
	REFERENCE_INVOICE: number;
	ENTIDAD: string;
	FACTURAR_A: string;
	CIF: string;
	DIRECCION: string;
	CIUDAD: string;
	CP: string;
	PROVINCIA: string;
	TIPO_EPI: string;
	SERVICIO: string;
	DOCTOR: string;
	FINGRESO: Date;
	FALTA: Date;
	PACIENTE: string;
	NIF: string;
	POLIZA: string;
	CALLE: string;
	TELEFONO: string;
	CP_PAC: string;
	LOCALIDAD_PAC: string;
	PROVINCIA_PAC: string;
	TOTAL: number;
	PORDESC: number;
	BRUTO: number;
	DESCUENTO: number;
	IMPUESTOS: number;
	PORIMP: number;
	IMPUESTO: string;
	PIE_FACTURA: string;
	TARIFA: string;
	DES_TARIFA: string;
	TEXTO_IMPUESTO: string;
	EXISTE_FACTURA: string;
	EXISTE_INFORME: string;
	EXISTE_XSIG: string;
	EXISTE_RESULTADO: string;
	EXISTE_DOCUMENTO: string;
	SUBENCOUNTER: number;
	REMESA: number;
	ES_DE_REMESA: number;
	FECHA_NAC: Date;
	lineas: [
		{
			INVOICE: number;
			FACILITY: number;
			TIPO: string;
			CONCEPTO: string;
			CANTIDAD: number;
			PRECIO: number;
			IMPORTE: number;
			BRUTO: number;
			ALIASC: string;
		}
	];
	FICHEROS: string[];
	JUSTIFICANTE: TJustificante;
};

export type TJustificante = {
	tipoEnvio: string;
	registro: string;
	fechaEnvio: Date;
	usuario: string;
};

export type tPeriodo = {
	periodo: string;
	facturas: number;
	importe: number;
};
export type TEnvio = {
	SID: number;
	DESCRIPCION: string;
};
