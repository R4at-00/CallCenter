import type { AppContextType, incidencia } from "@/@types/app";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AppContext } from "@/context/appContext";
import { useContext, useEffect } from "react";

export default function IncidentsTable() {

  const { updateIncidencias, incidencias } = useContext(AppContext) as AppContextType
  useEffect(() => {
    const fetchIncidencias = (): Promise<Array<incidencia>> => {
      return fetch('http://localhost:3000/api/incidencias').then(res => res.json());
    }
    fetchIncidencias()
      .then(updateIncidencias)
    
  }, [incidencias])

  return (
    <Table className='border-2'>
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="w-[100px]">Registro</TableHead>
          <TableHead>NHC</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-left">Incidencia</TableHead>
          <TableHead className="text-center">Estado</TableHead>
          <TableHead className="text-right">Responsable</TableHead>
          <TableHead className="text-right">Prioridad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incidencias.map((registro) => (
          <TableRow key={registro.id}>
            <TableCell className="font-medium">{registro.id}</TableCell>
            <TableCell>{registro.NHC}</TableCell>
            <TableCell>{registro.fecha}</TableCell>
            <TableCell className="text-left max-w-2xs overflow-x-hidden">{registro.incidencia}</TableCell>
            <TableCell className="text-center">{registro.estado}</TableCell>
            <TableCell className="text-right">{registro.responsable}</TableCell>
            <TableCell className="text-right">{registro.prioridad}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
