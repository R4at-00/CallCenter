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
import { useContext, useEffect, useState } from "react";

export default function IncidentsTable() {
  const { updateIncidencias, incidencias } = useContext(AppContext) as AppContextType

  const [replyDialogActive, setReplyDialogActive] = useState<boolean>(false);
  const [replyDialogId, setReplyDialogId] = useState<string>('');
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
    <>
    
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
          {incidencias.map((registro) => (
            <TableRow key={registro.id} className="border-0 h-6" onClick={() => {
              setReplyDialogActive(true)
              setReplyDialogId(registro.id)
            }}>
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
      {replyDialogActive && <ReplyIncident incidencia={replyDialogId}/>}
    </>
  );
}
