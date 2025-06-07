import { useReducer } from "react"
import type {nuevaIncidencia} from '@/@types/app'
interface FormState {
    inputValues: nuevaIncidencia
}

const INITIAL_STATE = {
    NHC: '',
    Fecha: '',
    Incidencia: '',
    Estado: '',
    Responsable: '',
    Prioridad: ''
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

const formReducer = (state:FormState["inputValues"], action: FormReducerAction) => {
    switch(action.type){
        case "change_value":
            const {inputName, inputValue} = action.payload;
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