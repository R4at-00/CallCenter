import React, { useContext, useState } from 'react';
import plus from './../../img/plus.svg'
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { AppContextType, incidencia } from '@/@types/app';
import { AppContext } from '@/context/appContext';
import useNewIncidentForm from '@/hooks/useNewIncidentForm';
import { DialogDescription } from '@radix-ui/react-dialog';

export default function NewIncident() {
    const [isAsignarNHCDisabled, setIsAsignarNHCDisabled] = useState(true);
    const { updateIncidencias } = useContext(AppContext) as AppContextType
    const [inputValues, dispatch] = useNewIncidentForm();

    return (
        <Dialog>
            <form>
                <DialogTrigger className='p-4 text-s' asChild>
                    <Button className='gap-1 p-3 h-10 bg-[#8bd9f0] hover:bg-[#8ed4e9]' variant="outline">
                        {<img className='h-6' src={plus} />}Agregar
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] p-8">
                    <DialogHeader>
                        <DialogTitle className='pb-4 pt-2 border-b-2'>Nueva Incidencia</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex gap-6 mt-5'>
                        <div className="grid gap-6 w-fit grow-1 pr-6 border-r-2 border-gray-100">
                            <div className="grid gap-3">
                                <Label htmlFor="estado" >Estado de la incidencia</Label>
                                <Select
                                    name="Estado"
                                    required
                                    value={inputValues.Estado}
                                    onValueChange={(val) =>
                                        dispatch({
                                            type: "change_value",
                                            payload: { inputName: "Estado", inputValue: val }
                                        })

                                    }
                                >
                                <SelectTrigger id="estado" className="w-fit">
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Estado</SelectLabel>
                                        <SelectItem defaultChecked value="C">Pendiente procesar por Call Center</SelectItem>
                                        <SelectItem value="H">Pendiente procesar por SJD</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="clasificacion">Clasificación</Label>
                            <Select
                                name="Clasificacion"
                                required
                                value={inputValues.Clasificacion}
                                onValueChange={(val) =>
                                    dispatch({
                                        type: "change_value",
                                        payload: { inputName: "Clasificacion", inputValue: val }
                                    })
                                }
                            >
                                <SelectTrigger id="clasificacion" className="w-fit">
                                    <SelectValue placeholder="Clasificación" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Clasificación</SelectLabel>
                                        <SelectItem defaultChecked value="AGRADECIMIENTOS">AGRADECIMIENTOS</SelectItem>
                                        <SelectItem value="CONSULTA COMPAÑÍAS">CONSULTA COMPAÑÍAS</SelectItem>
                                        <SelectItem value="CONSULTA MUTUAS">CONSULTA MUTUAS</SelectItem>
                                        <SelectItem value="CONSULTA PREANESTESIA PRIVADOS(TODOS)">CONSULTA PREANESTESIA PRIVADOS(TODOS)</SelectItem>
                                        <SelectItem value="CONSULTA PREANESTESIA SECASA">CONSULTA PREANESTESIA SECASA</SelectItem>
                                        <SelectItem value="CONSULTA PRIVADOS DE PAGO">CONSULTA PRIVADOS DE PAGO</SelectItem>
                                        <SelectItem value="CONSULTA SECASA">CONSULTA SECASA</SelectItem>
                                        <SelectItem value="INFORMACIÓN DUDAS">INFORMACIÓN DUDAS</SelectItem>
                                    </SelectGroup>

                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="responsable">Responsable</Label>
                            <Select
                                name="Responsable"
                                required
                                value={inputValues.Responsable}
                                onValueChange={(val) =>
                                    dispatch({
                                        type: "change_value",
                                        payload: { inputName: "Responsable", inputValue: val }
                                    })
                                }
                            >
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
                            <Select
                                name="Prioridad"
                                required
                                value={inputValues.Prioridad}
                                onValueChange={(val) =>
                                    dispatch({
                                        type: "change_value",
                                        payload: { inputName: "Prioridad", inputValue: val }
                                    })
                                }
                            >
                                <SelectTrigger id="prioridad" className="w-fit">
                                    <SelectValue placeholder="Prioridad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Prioridad</SelectLabel>
                                        <SelectItem defaultChecked value="Normal">Normal</SelectItem>
                                        <SelectItem value="Urgente">Urgente</SelectItem>
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
                                    <RadioGroupItem onClick={() => setIsAsignarNHCDisabled(true)} value="paciente-sin-NHC" id="paciente-sin-NHC" />
                                </div>
                                <div className="flex gap-2 items-center space-x-2">
                                    <Label className='m-0' htmlFor="paciente-con-NHC">Paciente con número de historia</Label>
                                    <RadioGroupItem onClick={() => setIsAsignarNHCDisabled(false)} value="paciente-con-NHC" id="paciente-con-NHC" />
                                </div>
                            </RadioGroup>
                            <Input value={inputValues.NHC} name="NHC" onChange={(evt) => {
                                dispatch({
                                    type: "change_value",
                                    payload: { inputName: "NHC", inputValue: evt.target.value }
                                })
                            }} required maxLength={6} pattern='[0-9]*' disabled={isAsignarNHCDisabled} id="asignar-NHC" placeholder='NHC' className='w-fit' />
                        </div>
                        <Textarea value={inputValues.Incidencia} name="Incidencia" onChange={(evt) => {
                            dispatch({
                                type: "change_value",
                                payload: { inputName: "Incidencia", inputValue: evt.target.value }
                            })
                        }} className='h-full shadow-lg' />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() => setIsAsignarNHCDisabled(true)} variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button className='bg-[#8bd9f0] hover:bg-[#8ed4e9] text-black' onClick={async (event) => {
                        if((!isAsignarNHCDisabled && inputValues.NHC !== "") || (isAsignarNHCDisabled && inputValues.NHC === "")){
                            event.preventDefault();
                            try {
                                // const newIncidenciaCompleta: incidencia = { ...inputValues, id: (incidencias.length + 1).toString() };
                                console.log(JSON.stringify(inputValues));
                                const resp = await fetch("http://localhost:3000/api/incidencias", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(inputValues),
                                });
                                await resp.json();
                                dispatch({ type: "clear" });
                            } catch (err) {
                                console.error(err);
                                alert('Por favor, cumplimente todos los campos.')
                            }
    
                            async function fetchIncidencias(): Promise<Array<incidencia>> {
                                return fetch('http://localhost:3000/api/incidencias').then(res => res.json());
                            }
                            fetchIncidencias()
                                .then(updateIncidencias)
                            const controller = new AbortController()
                            return () => { controller.abort() }
                        }else{
                            alert('Por favor, cumplimente todos los campos.')
                        }

                    }} type="submit" >Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </form>
        </Dialog >
    );
}