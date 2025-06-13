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
import { useContext } from "react";
// import ReplyIncident from "./replyIncident";

export default function IncidentsTable() {
  const { incidencias, setReplyDialogActive, setReplyDialogId } = useContext(AppContext) as AppContextType


  const formatDate = (fecha: string) => {
    return fecha.split('T')[0];
  }

  const formatIncident = (incidencia: incidencia) => {
    if(incidencia.Estado === 'R'){
      return "via-[#04f604]"
    }else{
      if(incidencia.Prioridad === 'Urgente'){
        return "via-[#f08782]"
      }else if(incidencia.Prioridad === 'Normal'){
        return "via-[#fbf504]"
      } 
    }
  }

  return (
    <div className="h-[500px] overflow-y w-full flex flex-col">
      <Table >
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
            <TableRow key={incidencia.id} className="border-b-1 h-6" onClick={() => {
              setReplyDialogId(incidencia.id)
              setReplyDialogActive(true)
            }}>
              <TableCell className="font-medium">{incidencia.id}</TableCell>
              <TableCell >{incidencia.NHC}</TableCell>
              <TableCell>{formatDate(incidencia.Fecha)}</TableCell>
              <TableCell className={`text-left max-w-2xs overflow-x-hidden border-b-gray-300 bg-gradient-to-r from-white-500 ${formatIncident(incidencia)} to-white-500`}>{incidencia.Incidencia}</TableCell>
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
