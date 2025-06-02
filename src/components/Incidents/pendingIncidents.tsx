import React from 'react'

interface PendingIncidentsProps {
    name: string,
    value: Number
}

export default function PendingIncidents(props: PendingIncidentsProps){
    // Variable de estado que se encargue de contar incidencias de la tabla 
    // según el nombre que haya sido seleccionado pasado por props
    return (
        <p className='text-gray-400'>Incidencias pendientes de {props.name}: {props.value}</p>
    );
}