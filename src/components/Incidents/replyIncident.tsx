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
            <div className={`bg-transparent self-center`}>
                {incidenciaSeleccionada.Respuesta !== undefined && <form>
                    <div className="p-5 rounded-2xl hover:shadow-lg transition-shadow bg-white w-fit">
                        <div className={`flex flex-col gap-4 `}>
                            <Textarea className="bg-white w-[350px]" value={reply} onChange={({ target }) => setReply(target.value)} name="name" />
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
                                        // console.log(coords)
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
                            }>Responder</Button>
                        </div>
                    </div>
                </form>}
            </div>
    )
}
