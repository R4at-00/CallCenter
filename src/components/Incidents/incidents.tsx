import React, {useContext, useEffect, useState/*, useContext, createContext*/} from 'react';
import FilterPannel from './filterPannel';
import IncidentsTable from './incidentsTable';
import PendingIncidents from './pendingIncidents';
import NewIncident from './newIncident';

import { AppContext } from '@/context/appContext';
import type { AppContextType } from '@/@types/app';

export default function Incidents(){
    const {usuario, incidencias} = useContext(AppContext) as AppContextType;
    const [contadorCallCenter, setCCC] = useState(incidencias.filter(incidencia => incidencia.Estado === "C").length);
    const [contadorSJD, setContadorSJD] = useState(incidencias.filter(incidencia => incidencia.Estado === "H").length);
    
    useEffect(() => {
        setCCC(incidencias.filter(incidencia => incidencia.Estado === "C").length)
        setContadorSJD(incidencias.filter(incidencia => incidencia.Estado === "H").length)
    }, [incidencias]);

    return (
        <div className='flex w-fit flex-col items-start gap-3.5'>
            <div className='flex justify-between items-center w-full mb-5 border-0 border-gray-200 p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow'>
                {/* {usuario?.admin && <NewIncident/>} */}
                <h1 className='text-2xl'>Call Center</h1>
                <NewIncident/>
            </div>
            <div className='border-0 p-5 border-gray-100 rounded-xl mb-4 shadow-s hover:shadow-md transition-shadow'>
                <h1 className='border-b-1 border-gray-200 pb-1 mb-2'>Incidencias pendientes</h1>
                <div className='flex gap-5'>
                    <PendingIncidents name="Call Center" value={contadorCallCenter}/>
                    <PendingIncidents name="SJD" value={contadorSJD}/>
                </div>
            </div>
            <FilterPannel/>
            <IncidentsTable/>
        </div>
    );
}