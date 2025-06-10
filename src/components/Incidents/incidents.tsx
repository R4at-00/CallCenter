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
            {/* {usuario?.admin && <NewIncident/>} */}
            <NewIncident/>
            <FilterPannel/>
            <IncidentsTable/>
            <div className=''>
                <PendingIncidents name="Call Center" value={contadorCallCenter}/>
                <PendingIncidents name="SJD" value={contadorSJD}/>
            </div>
        </div>
    );
}