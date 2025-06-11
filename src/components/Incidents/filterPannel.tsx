import * as React from "react"
import DatePick from './datePick'
import search from './../../img/search.svg'
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
import { useContext, useState } from "react";
import type { AppContextType, incidencia } from "@/@types/app";
import { AppContext } from "@/context/appContext";
import { Button } from "../ui/button";

export default function FilterPannel() {

    const { updateIncidencias } = useContext(AppContext) as AppContextType;
    const [NHC, setNHC] = useState<string>('');
    const [estado, setEstado] = useState<string>('all');
    const [responsable, setResponsable] = useState<string>('all');
    const [desdeFecha, setDesdeFecha] = useState<Date>();
    const [hastaFecha, setHastaFecha] = useState<Date>();

    const fetchIncidencias = async (): Promise<Array<incidencia>> => {
        return await fetch('http://localhost:3000/api/incidencias').then(res => res.json());
    }

    async function filtrarIncidencias(): Promise<void> {
        const nuevasInc = await fetchIncidencias()
        updateIncidencias(filtrar(nuevasInc))
    }

    const filtrar = (arrayIncidencias: incidencia[]): incidencia[] => {
        return arrayIncidencias.filter(incidencia => {
            const fechaIncidencia = new Date(incidencia.Fecha);

            if (NHC !== "" && incidencia.NHC !== NHC) return false;
            if (estado !== "all" && incidencia.Estado !== estado) return false;
            if (responsable !== "all" && incidencia.Responsable !== responsable) return false;
            if (desdeFecha && fechaIncidencia.getTime() < desdeFecha.getTime()) return false;
            if (hastaFecha && fechaIncidencia.getTime() > hastaFecha.getTime()) return false;

            return true;
        })
    }

    return (
        <div className='flex flex-wrap gap-4 w-full'>
            <DatePick name="Desde Fecha" fecha={desdeFecha as Date} setFecha={setDesdeFecha} />
            <DatePick name="Hasta Fecha" fecha={hastaFecha as Date} setFecha={setHastaFecha} />
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
            <Button className="bg-[#8bd9f0] hover:bg-[#8ed4e9] text-black" onClick={filtrarIncidencias}><img className="h-4" src={search}/>Buscar</Button>
        </div>
    )
}