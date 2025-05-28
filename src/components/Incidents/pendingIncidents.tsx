import React from 'react'

export default function PendingIncidents(props){
    // Variable de estado que se encargue de contar incidencias de la tabla 
    // según el nombre que haya sido seleccionado pasado por props
    return (
        <p>Incidencias pendientes de {props.name}: {props.value}</p>
    );
}