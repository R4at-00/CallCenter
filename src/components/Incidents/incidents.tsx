import React, {useContext, useState/*, useContext, createContext*/} from 'react';
import NewIncident from './newIncident';
import FilterPannel from './filterPannel';
import IncidentsTable from './incidentsTable';
import PendingIncidents from './pendingIncidents';

import { AppContext } from '@/context/appContext';
import type { AppContextType } from '@/@types/app';

export default function Incidents(){
    const {usuario} = useContext(AppContext) as AppContextType;
    const [contadorCallCenter/*, setCCC*/] = useState(0);
    const [contadorSJD/*, setContadorSJD*/] = useState(0);
    
    return (
        <div className='flex w-fit flex-col items-start gap-3.5'>
            {usuario?.admin && <NewIncident/>}
            <FilterPannel/>
            <IncidentsTable/>
            <PendingIncidents name="Call Center" value={contadorCallCenter}/>
            <PendingIncidents name="SJD" value={contadorSJD}/>
        </div>
    );
}