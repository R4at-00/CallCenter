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
  async function fetchIncidencias(): Promise<Array<incidencia>>{
    return fetch('http://localhost:3000/api/incidencias').then(res => res.json());
  }
  useEffect(() => {
    fetchIncidencias()
      .then(updateIncidencias)
    const controller = new AbortController()
    return () => { controller.abort() }
  }, []);

  const formatDate = (fecha: string) => {
    return fecha.split('T')[0];
  }

  return (
    <Table className='border-2'>
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="w-fit">Registro</TableHead>
          <TableHead>NHC</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-left w-fit">Incidencia</TableHead>
          <TableHead className="text-center">Estado</TableHead>
          <TableHead className="text-left pl-6">Responsable</TableHead>
          <TableHead className="text-right">Prioridad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incidencias.map((registro) => (
          <TableRow key={registro.id}>
            <TableCell className="font-medium">{registro.id}</TableCell>
            <TableCell >{registro.NHC}</TableCell>
            <TableCell>{formatDate(registro.Fecha)}</TableCell>
            <TableCell className="text-left max-w-2xs overflow-x-hidden">{registro.Incidencia}</TableCell>
            <TableCell className="text-center">{registro.Estado}</TableCell>
            <TableCell className="text-left pl-6">{registro.Responsable}</TableCell>
            <TableCell className="text-right">{registro.Prioridad}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
