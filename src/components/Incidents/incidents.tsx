import React, {useState/*, useContext, createContext*/} from 'react';
import NewIncident from './newIncident';
import FilterPannel from './filterPannel';
import IncidentsTable from './incidentsTable';
import PendingIncidents from './pendingIncidents';

export default function Incidents(){
    const [contadorCallCenter/*, setCCC*/] = useState(0);
    const [contadorSJD/*, setContadorSJD*/] = useState(0);
    
    return (
        <div className='flex w-fit flex-col items-start gap-3.5'>
            <NewIncident/>
            <FilterPannel/>
            <IncidentsTable/>
            <PendingIncidents name="Call Center" value={contadorCallCenter}/>
            <PendingIncidents name="SJD" value={contadorSJD}/>
        </div>
    );
}