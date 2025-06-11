import React from 'react'

interface PendingIncidentsProps {
    name: string,
    value: number
}

export default function PendingIncidents(props: PendingIncidentsProps){
    // Variable de estado que se encargue de contar incidencias de la tabla 
    // según el nombre que haya sido seleccionado pasado por props
    return (
        <p className='text-gray-400'>{props.name}: <span className='text-gray-600'>{props.value}</span></p>
    );
}