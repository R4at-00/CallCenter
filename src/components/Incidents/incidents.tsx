import { useContext, useEffect, useState } from 'react';
import FilterPannel from './filterPannel';
import IncidentsTable from './incidentsTable';
import PendingIncidents from './pendingIncidents';
import NewIncident from './newIncident';

import { AppContext } from '@/context/appContext';
import type { AppContextType } from '@/@types/app';
import ReplyIncident from './replyIncident';

export default function Incidents(){
    
    const { incidencias, replyDialogActive, usuario } = useContext(AppContext) as AppContextType
    const [contadorCallCenter, setCCC] = useState(incidencias.filter(incidencia => incidencia.Estado === "C").length);
    const [contadorSJD, setContadorSJD] = useState(incidencias.filter(incidencia => incidencia.Estado === "H").length);

    useEffect(() => {
        setCCC(incidencias.filter(incidencia => incidencia.Estado === "C").length)
        setContadorSJD(incidencias.filter(incidencia => incidencia.Estado === "H").length)
    }, [incidencias]);

    return (
        <div className='flex w-fit flex-col items-start gap-3.5'>
            {replyDialogActive && <div className={`absolute w-full h-screen bg-[#00000060] self-center z-10`}><ReplyIncident/></div>}
            <div className='pt-10 flex justify-between items-center w-full mb-5 border-0 border-gray-200 p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow'>
                <h1 className='text-2xl'>Call Center</h1>
                {/* {usuario?.admin && <NewIncident/>} */}
                <NewIncident/>
            </div>
            <div className='border-0 p-5 border-gray-100 rounded-xl mb-4 shadow-xs hover:shadow-md transition-shadow'>
                <h1 className='border-b-1 border-gray-200 pb-1 mb-2'>Incidencias pendientes</h1>
                <div className='flex gap-5'>
                    <PendingIncidents name="Call Center" value={contadorCallCenter}/>
                    <PendingIncidents name="SJD" value={contadorSJD}/>
                </div>
            </div>
            <div className='border-1 rounded-2xl border-gray-200 shadow-xs hover:shadow-lg transition-shadow p-5 flex flex-col gap-5'>
                <FilterPannel/>
                <IncidentsTable/>
            </div>
        </div>
    );
}