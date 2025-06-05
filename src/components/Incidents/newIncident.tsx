import React, { useContext, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { AppContextType } from '@/@types/app';
import { AppContext } from '@/context/appContext';


export default function NewIncident() {
    const [isAsignarNHCActive, setIsAsignarNHCActive] = useState(false);
    // const $asignarNHC: HTMLInputElement = document.getElementById('asignar-NHC') as HTMLInputElement;
    const { usuarioNick } = useContext(AppContext) as AppContextType
    const generarEncabezadoIncidencia = `[${usuarioNick}-${obtenerFechaHoraActual()}]:`

    function obtenerFechaHoraActual(): string {
        const ahora = new Date();
        const dia = String(ahora.getDate()).padStart(2, '0');
        const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
        const anio = ahora.getFullYear();
        const horas = ahora.getHours();
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger className='p-4 text-s' asChild>
                    <Button variant="outline">Nueva Incidencia</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] p-8">
                    <DialogHeader>
                        <DialogTitle className='pb-4 pt-2 border-b-2'>Nueva Incidencia</DialogTitle>
                    </DialogHeader>
                    <div className='flex gap-6 mt-5'>
                        <div className="grid gap-6 w-fit grow-1 pr-6 border-r-2 border-gray-100">
                            <div className="grid gap-3">
                                <Label htmlFor="estado" >Estado de la incidencia</Label>
                                <Select>
                                    <SelectTrigger id="estado" className="w-fit">
                                        <SelectValue placeholder="Estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Estado</SelectLabel>
                                            <SelectItem defaultChecked value="callcenter">Pendiente procesar por Call Center</SelectItem>
                                            <SelectItem value="sjd">Pendiente procesar por SJD</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="clasificacion">Clasificación</Label>
                                <Select>
                                    <SelectTrigger id="clasificacion" className="w-fit">
                                        <SelectValue placeholder="Clasificación" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Clasificación</SelectLabel>
                                            <SelectItem defaultChecked value="agradecimientos">AGRADECIMIENTOS</SelectItem>
                                            <SelectItem value="consulta-companias">CONSULTA COMPAÑÍAS</SelectItem>
                                            <SelectItem value="consulta-mutuas">CONSULTA MUTUAS</SelectItem>
                                            <SelectItem value="consulta-preanestesia-privados">CONSULTA PREANESTESIA PRIVADOS(TODOS)</SelectItem>
                                            <SelectItem value="consulta-preanestesia-secasa">CONSULTA PREANESTESIA SECASA</SelectItem>
                                            <SelectItem value="consulta-privados">CONSULTA PRIVADOS DE PAGO</SelectItem>
                                            <SelectItem value="consulta-secasa">CONSULTA SECASA</SelectItem>
                                            <SelectItem value="informacion">INFORMACIÓN DUDAS</SelectItem>
                                        </SelectGroup>

                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="responsable">Responsable</Label>
                                <Select>
                                    <SelectTrigger id='responsable' className="w-fit">
                                        <SelectValue placeholder="Responsable" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Responsable</SelectLabel>
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
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="prioridad" >Prioridad</Label>
                                <Select>
                                    <SelectTrigger id="prioridad" className="w-fit">
                                        <SelectValue placeholder="Prioridad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>

                                            <SelectLabel>Prioridad</SelectLabel>
                                            <SelectItem defaultChecked value="normal">Normal</SelectItem>
                                            <SelectItem value="urgente">Urgente</SelectItem>

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                            <div id="paciente-NHC" className='flex flex-col gap-4  border-1 border-gray-200 rounded-2xl p-4'>
                                <RadioGroup className='flex gap-6' defaultValue="paciente-sin-NHC">
                                    <div className="flex gap-2 items-center">
                                        <Label className='m-0' htmlFor="paciente-sin-NHC">Paciente sin número de historia</Label>
                                        <RadioGroupItem onClick={() => setIsAsignarNHCActive(true)}  value="paciente-sin-NHC" id="paciente-sin-NHC" />
                                    </div>
                                    <div className="flex gap-2 items-center space-x-2">
                                        <Label className='m-0' htmlFor="paciente-con-NHC">Paciente con número de historia</Label>
                                        <RadioGroupItem onClick={() => setIsAsignarNHCActive(false)} value="paciente-con-NHC" id="paciente-con-NHC" />
                                    </div>
                                </RadioGroup>
                                <Input maxLength={6} disabled={isAsignarNHCActive} id="asignar-NHC" placeholder='NHC' className='w-fit' />
                            </div>
                            <Textarea defaultValue={generarEncabezadoIncidencia} className='h-full shadow-lg' />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}