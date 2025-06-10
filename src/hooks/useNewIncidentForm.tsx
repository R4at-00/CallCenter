import { useContext, useReducer } from "react"
import type { AppContextType, nuevaIncidencia } from '@/@types/app'
import { AppContext } from "@/context/appContext";
interface FormState {
    inputValues: nuevaIncidencia
}

function obtenerFechaHoraActual(): string {
    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const anio = ahora.getFullYear();
    return `${anio}-${mes}-${dia}`;
}
const INITIAL_STATE = {
    NHC: '',
    Fecha: obtenerFechaHoraActual(),
    Incidencia: '',
    Estado: '',
    Responsable: '',
    Prioridad: '',
    Clasificacion: ''
}

type FormReducerAction = {
    type: "change_value",
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: "clear"
}

const formReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    switch (action.type) {
        case "change_value":
            const { inputName, inputValue } = action.payload;
            return {
                ...state,
                [inputName]: inputValue
            }
        case "clear":
            return INITIAL_STATE;
    }
}

const useNewIncidentForm = () => {
    return useReducer(formReducer, INITIAL_STATE)
}

export default useNewIncidentForm;