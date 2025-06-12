import type { AppContextType, coord, incidencia } from "@/@types/app";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AppContext } from "@/context/appContext";
import { useContext, useEffect, useState } from "react";
// import ReplyIncident from "./replyIncident";

export default function IncidentsTable() {
  const { updateIncidencias, incidencias, setReplyDialogActive, setReplyDialogId } = useContext(AppContext) as AppContextType

  // const [coords, setCoords] = useState<coord>({x: 0, y: 0});
  async function fetchIncidencias(): Promise<Array<incidencia>> {
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
    <div className="w-full flex flex-col">
      <Table className=''>
        <TableHeader className="border-b-1 border-gray-300">
          <TableRow className="">
            <TableHead className="w-fit font-light">Registro</TableHead>
            <TableHead className="font-light">NHC</TableHead>
            <TableHead className="font-light">Fecha</TableHead>
            <TableHead className="text-left w-fit font-light">Incidencia</TableHead>
            <TableHead className="text-center font-light">Estado</TableHead>
            <TableHead className="text-left pl-6 font-light">Responsable</TableHead>
            <TableHead className="text-right font-light">Prioridad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidencias.map((incidencia) => (
            <TableRow key={incidencia.id} className="border-0 h-6" onClick={() => {
              if(incidencia.Respuesta === null){
                setReplyDialogId(incidencia.id)
                setReplyDialogActive(true)
              }else{
                
              }
            }}>
              <TableCell className="font-medium">{incidencia.id}</TableCell>
              <TableCell >{incidencia.NHC}</TableCell>
              <TableCell>{formatDate(incidencia.Fecha)}</TableCell>
              <TableCell className="text-left max-w-2xs overflow-x-hidden">{incidencia.Incidencia}</TableCell>
              <TableCell className="text-center">{incidencia.Estado}</TableCell>
              <TableCell className="text-left pl-6">{incidencia.Responsable}</TableCell>
              <TableCell className="text-right">{incidencia.Prioridad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </div>
  );
}
