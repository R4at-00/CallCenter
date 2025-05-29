import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
const registros = [
  {
    nRegistro: "12354",
    NHC: "518177",
    fecha: "09/07/03",
    incidencia: "[usuario1234-09/07/03 9:01]: El paciente PASCAL RODRÍGUEZ, JAVIER ...",
    estado: "H",
    responsable: "CONSULTAS EXTERNAS",
    prioridad: "Normal"
  },
  {
    nRegistro: "12355",
    NHC: "518177",
    fecha: "09/07/03",
    incidencia: "[usuario1234-09/07/03 9:01]: El paciente PASCAL RODRÍGUEZ, JAVIER ...",
    estado: "C",
    responsable: "CONSULTAS EXTERNAS",
    prioridad: "Normal"
  },
  {
    nRegistro: "12356",
    NHC: "518177",
    fecha: "09/07/03",
    incidencia: "[usuario1234-09/07/03 9:01]: El paciente PASCAL RODRÍGUEZ, JAVIER ...",
    estado: "H",
    responsable: "CONSULTAS EXTERNAS",
    prioridad: "Normal"
  },
  {
    nRegistro: "12357",
    NHC: "518177",
    fecha: "09/07/03",
    incidencia: "[usuario1234-09/07/03 9:01]: El paciente PASCAL RODRÍGUEZ, JAVIER ...",
    estado: "C",
    responsable: "CONSULTAS EXTERNAS",
    prioridad: "Normal"
  },
  
]
// En vez de la constante invoices, sería un contenedor de registros pasado por props
export default function IncidentsTable() {
    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
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
                {registros.map((registro) => (
                    <TableRow key={registro.nRegistro}>
                        <TableCell className="font-medium">{registro.nRegistro}</TableCell>
                        <TableCell>{registro.NHC}</TableCell>
                        <TableCell>{registro.fecha}</TableCell>
                        <TableCell className="text-left">{registro.incidencia}</TableCell>
                        <TableCell className="text-center">{registro.estado}</TableCell>
                        <TableCell className="text-right">{registro.responsable}</TableCell>
                        <TableCell className="text-right">{registro.prioridad}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}