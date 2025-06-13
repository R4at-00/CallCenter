import type { AppContextType, incidencia } from "@/@types/app"
import { Button } from "@/components/ui/button"
import { Textarea } from "../ui/textarea"
import { useContext, useState } from "react"
import { AppContext } from "@/context/appContext"

export default function ReplyIncident() {
    const [reply, setReply] = useState<string>("");
    const { updateIncidencias, replyDialogId, setReplyDialogActive, incidencias } = useContext(AppContext) as AppContextType;

    const incidenciaSeleccionada = incidencias.find(incidencia => incidencia.id === replyDialogId) as incidencia;

    const replyObj = {
        Respuesta: reply,
        Estado: 'R'
    }
    const formatDate = (fecha: string) => {
        return fecha.split('T')[0];
    }
    const formatState = (Estado: string) => {
        switch (Estado) {
            case 'H':
                return 'Pendiente procesar por SJD'
            case 'C':
                return 'Pendiente procesar por Call Center'
            case 'R':
                return 'Resuelto'
            default:
                return ''
        }
    }
    return (
        <div className={`flex justify-center items-center h-screen z-50`}>
            <form>
                <div className="p-5 rounded-2xl hover:shadow-lg transition-shadow bg-white w-[500px]">
                    <h1 className="text-xl border-b-1 mb-3 pb-3">Incidencia Nº {incidenciaSeleccionada.id}</h1>
                    <div className="flex flex-col gap-3 p-2 pb-4">
                        {incidenciaSeleccionada.NHC !== "      " &&
                            <p>{incidenciaSeleccionada.NHC} <span className="text-gray-200"> NHC</span></p>}
                        <p>{formatDate(incidenciaSeleccionada.Fecha)} <span className="text-gray-200"> Fecha</span></p>
                        <p>{incidenciaSeleccionada.Clasificacion} <span className="text-gray-200"> Clasificación</span></p>
                        <p>{incidenciaSeleccionada.Prioridad} <span className="text-gray-200"> Prioridad</span></p>
                        <p>{incidenciaSeleccionada.Responsable} <span className="text-gray-200"> Responsable</span></p>
                        <p>{formatState(incidenciaSeleccionada.Estado)} <span className="text-gray-200"> Estado</span></p>
                        <div className="border-b-1 mt-3 mb-3"></div>
                        <div className="mb-3">
                            <p className="mb-2 font-light">Incidencia</p>
                            <p className="border-1 border-gray-200 rounded-md p-3 shadow-xs">{incidenciaSeleccionada.Incidencia}</p>
                        </div>
                        <div className="mb-5 ">
                            <p className="mb-2 font-light">Respuesta</p>
                            {incidenciaSeleccionada.Respuesta === null &&
                                <Textarea required className="bg-white" value={reply} onChange={({ target }) => setReply(target.value)} name="name" />
                            }
                            {incidenciaSeleccionada.Respuesta !== null &&
                                <p className="border-1 border-gray-200 rounded-md p-3">{incidenciaSeleccionada.Respuesta}</p>
                            }
                        </div>
                        <div className={`flex flex-col gap-4 `}>
                            <div className="flex justify-between">
                                <Button onClick={
                                    () => setReplyDialogActive(false)
                                } className="w-fit bg-white text-black hover:bg-[#ebebeb] border-1">Cerrar</Button>
                                {incidenciaSeleccionada.Respuesta === null && <Button type="submit" onClick={
                                    async (event) => {
                                        event.preventDefault();
                                        if(incidenciaSeleccionada.Respuesta !== ""){
                                            try {
                                                console.log(JSON.stringify(replyObj));
                                                const resp = await fetch(`http://localhost:3000/api/incidencias/${replyDialogId}`, {
                                                    method: "PATCH",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify(replyObj),
                                                });
                                                await resp.json();
                                                setReply("")
                                            } catch (err) {
                                                console.error(err);
                                            }
                                            async function fetchIncidencias(): Promise<Array<incidencia>> {
                                                return fetch('http://localhost:3000/api/incidencias').then(res => res.json());
                                            }
                                            await fetchIncidencias()
                                                .then(updateIncidencias);
                                            setReplyDialogActive(false)
                                            const controller = new AbortController()
                                            return () => {
                                                controller.abort();
                                            }
                                        }
                                    }
                                } className="bg-[#8bd9f0] hover:bg-[#8ed4e9] text-black">Responder</Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
