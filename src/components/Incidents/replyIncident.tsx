import type { AppContextType, coord, incidencia } from "@/@types/app"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "../ui/textarea"
import { useContext, useState } from "react"
import { AppContext } from "@/context/appContext"

export default function ReplyIncident() {
    const [reply, setReply] = useState<string>("");
    const {updateIncidencias, replyDialogId, setReplyDialogActive, incidencias} = useContext(AppContext) as AppContextType;

    const incidenciaSeleccionada = incidencias.find(incidencia => incidencia.id === replyDialogId) as incidencia;

    const replyObj = {
        Respuesta: reply,
        Estado: 'R'
    }
    return (
            <div className={`flex justify-center items-center h-full z-50`}>
                <form>
                    <div className="p-5 rounded-2xl hover:shadow-lg transition-shadow bg-white w-fit ">
                        <div>
                            <p>{incidenciaSeleccionada.NHC} - NHC</p>
                            <p>{incidenciaSeleccionada.Fecha} - Fecha</p>
                            <p>{incidenciaSeleccionada.Clasificacion} - Clasificacion</p>
                            <p>{incidenciaSeleccionada.Prioridad} - Prioridad</p>
                            <p>{incidenciaSeleccionada.Responsable} - Responsable</p>
                            <p>{incidenciaSeleccionada.Estado} - Estado</p>
                        </div>
                        <div className={`flex flex-col gap-4 `}>
                            <Textarea className="bg-white w-[400px]" value={reply} onChange={({ target }) => setReply(target.value)} name="name" />
                            <div className="flex justify-between">
                                <Button onClick={
                                    () => setReplyDialogActive(false)
                                } className="w-fit bg-white text-black hover:bg-[#ebebeb] border-1">Cancelar</Button>
                                <Button type="submit" onClick={
                                    async (event) => {
                                        event.preventDefault();
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
                                } className="bg-[#8bd9f0] hover:bg-[#8ed4e9] text-black">Responder</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    )
}
