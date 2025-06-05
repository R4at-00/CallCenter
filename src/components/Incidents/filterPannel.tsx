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

export default function FilterPannel() {

    return (
        <div className='flex flex-wrap gap-4 w-full'>
            <DatePick name="Desde Fecha" />
            <DatePick name="Hasta Fecha" />
            <label className='flex items-center gap-2.5'>
                <Input placeholder="NHC" type="email" />
            </label>
                <label className="flex items-center gap-2.5">
                    <Select>
                        <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem defaultChecked value="all">Todas</SelectItem>
                            <SelectItem value="callcenter">Pendiente procesar por Call Center</SelectItem>
                            <SelectItem value="sjd">Pendiente procesar por SJD</SelectItem>
                            <SelectItem value="solved">Resueltas</SelectItem>
                        </SelectContent>
                    </Select>
                </label>
                <label className="flex items-center gap-2.5">
                    <Select>
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
        </div>
    )
}