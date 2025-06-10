import * as React from "react"
import DatePick from './datePick'
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useContext, useEffect, useState } from "react";
import type { AppContextType, incidencia } from "@/@types/app";
import { AppContext } from "@/context/appContext";
import { Button } from "../ui/button";

export default function FilterPannel() {

    const [NHC, setNHC] = useState<string>();
    const [estado, setEstado] = useState<string>();
    const [responsable, setResponsable] = useState<string>();
    const [incidenciasCompletas, setIncidenciasCompletas] = useState<Array<incidencia>>([]);
    const [desdeFecha, setDesdeFecha] = useState<Date>();
    const [hastaFecha, setHastaFecha] = useState<Date>();
    const { updateIncidencias } = useContext(AppContext) as AppContextType;

    const fetchIncidencias = async (): Promise<Array<incidencia>> => {
        return fetch('http://localhost:3000/api/incidencias').then(res => res.json());
    }
    useEffect(() => {
        filtrar()
    }, []);

    const filtrar = async () => {
        await fetchIncidencias()
            .then(setIncidenciasCompletas)
        if (NHC !== undefined) {
            updateIncidencias(
                incidenciasCompletas.filter((incidencia) => {
                    if (incidencia.NHC === NHC || NHC == "") {
                        return true;
                    } else {
                        return false;
                    }
                })
            )
        }
        if (estado !== undefined) {
            updateIncidencias(
                incidenciasCompletas.filter((incidencia) => {
                    if (incidencia.Estado === estado || estado === 'all') {
                        return true;
                    } else {
                        return false;
                    }
                })
            )
        }
        if (responsable !== undefined) {
            updateIncidencias(
                incidenciasCompletas.filter((incidencia) => {
                    if (incidencia.Responsable === responsable || responsable === 'all') {
                        return true;
                    } else {
                        return false;
                    }
                })
            )
        }
        if (desdeFecha !== undefined) {
            updateIncidencias(
                incidenciasCompletas.filter((incidencia) => {
                    const fechaIncidencia = new Date(incidencia.Fecha);
                    if (fechaIncidencia.getTime() > desdeFecha.getTime()) {
                        return true;
                    } else {
                        return false;
                    }
                })
            )
        }
        if (hastaFecha !== undefined) {
            updateIncidencias(
                incidenciasCompletas.filter((incidencia) => {
                    const fechaIncidencia = new Date(incidencia.Fecha);
                    if (fechaIncidencia.getTime() < hastaFecha.getTime()) {
                        return true;
                    } else {
                        return false;
                    }
                })

            );

        }

        const controller = new AbortController()
        return () => { controller.abort() }
    }
    // useEffect(() => {

    //     if (NHC !== undefined) {
    //         updateIncidencias(
    //             incidenciasCompletas.filter((incidencia) => {
    //                 if (incidencia.NHC === NHC || NHC == "") {
    //                     return true;
    //                 } else {
    //                     return false;
    //                 }
    //             })
    //         )
    //     } else {
    //         updateIncidencias(
    //             incidenciasCompletas
    //         )
    //     }
    //     const controller = new AbortController()
    //     return () => { controller.abort() }
    // }, [NHC]);

    // useEffect(() => {
    //     fetchIncidencias()
    //     .then(setIncidenciasCompletas)
    //     if (estado !== undefined) {
    //         updateIncidencias(
    //             incidenciasCompletas.filter((incidencia) => {
    //                 if (incidencia.Estado === estado || estado === 'all') {
    //                     return true;
    //                 } else {
    //                     return false;
    //                 }
    //             })
    //         )
    //     }
    // }, [estado]);

    // useEffect(() => {
    //     fetchIncidencias()
    //     .then(setIncidenciasCompletas)
    //     if (responsable !== undefined) {
    //         updateIncidencias(
    //             incidenciasCompletas.filter((incidencia) => {
    //                 if (incidencia.Responsable === responsable || responsable === 'all') {
    //                     return true;
    //                 } else {
    //                     return false;
    //                 }
    //             })
    //         )
    //     }
    // }, [responsable]);

    return (
        <div className='flex flex-wrap gap-4 w-full'>
            <DatePick name="Desde Fecha" fecha={desdeFecha as Date} setFecha={setDesdeFecha}/>
            <DatePick name="Hasta Fecha" fecha={hastaFecha as Date} setFecha={setHastaFecha}/>
            <label className='flex items-center gap-2.5'>
                <Input onChange={(evt) => setNHC(evt.target.value)} value={NHC} placeholder="NHC" type="email" />
            </label>
            <label className="flex items-center gap-2.5">
                <Select
                    name="Estado"
                    required
                    value={estado}
                    onValueChange={(evt) => setEstado(evt)}
                >
                    <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem defaultChecked value="all">Todas</SelectItem>
                        <SelectItem value="C">Pendiente procesar por Call Center</SelectItem>
                        <SelectItem value="H">Pendiente procesar por SJD</SelectItem>
                        <SelectItem value="R">Resueltas</SelectItem>
                    </SelectContent>
                </Select>
            </label>
            <label className="flex items-center gap-2.5">
                <Select
                    name="Responsable"
                    required
                    value={responsable}
                    onValueChange={(evt) => setResponsable(evt)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Responsable" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Encargado</SelectLabel>
                            <SelectItem defaultChecked value="all">Todos</SelectItem>
                            <SelectItem value="AGENDAS">AGENDAS</SelectItem>
                            <SelectItem value="CAR-DIG">CAR-DIG</SelectItem>
                            <SelectItem value="CARDIOLOGÍA INTERV.">CARDIOLOGÍA INTERV.</SelectItem>
                            <SelectItem value="CGD">CGD</SelectItem>
                            <SelectItem value="CONSULTAS EXTERNAS">CONSULTAS EXTERNAS</SelectItem>
                            <SelectItem value="DOCUMENTACIÓN CLÍNICA">DOCUMENTACIÓN CLÍNICA</SelectItem>
                            <SelectItem value="LISTA DE ESPERA">LISTA DE ESPERA</SelectItem>
                            <SelectItem value="MUTUAS">MUTUAS</SelectItem>
                            <SelectItem value="ODONTOLOGÍA">ODONTOLOGÍA</SelectItem>
                            <SelectItem value="PROGR.QUI.PRIVADOS">PROGR.QUI.PRIVADOS</SelectItem>
                            <SelectItem value="PROGR.QUI.SECASA">PROGR.QUI.SECASA</SelectItem>
                            <SelectItem value="RADIOLOGÍA">RADIOLOGÍA</SelectItem>
                            <SelectItem value="RADIOLOGÍA INTERV">RADIOLOGÍA INTERV</SelectItem>
                            <SelectItem value="REHABILITACIÓN">REHABILITACIÓN</SelectItem>
                            <SelectItem value="TRÁFICO">TRÁFICO</SelectItem>
                            <SelectItem value="OTROS">OTROS</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </label>
            <Button onClick={filtrar}>Buscar</Button>
        </div>
    )
}