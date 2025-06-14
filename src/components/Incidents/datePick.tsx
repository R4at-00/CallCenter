"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickProps {
  name: string,
  fecha: Date,
  setFecha: React.Dispatch<React.SetStateAction<Date>>
}

export default function DatePick(props: DatePickProps) {
  // const [incidenciasCompletas, setIncidenciasCompletas] = useState<Array<incidencia>>([]);
  // const { updateIncidencias } = useContext(AppContext) as AppContextType;
  
  return (
    <label className="flex items-center gap-2.5">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !props.fecha && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {props.fecha ? format(props.fecha, "PPP") : <span>{props.name}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar title="Desde fecha"
            mode="single"
            selected={props.fecha}
            onSelect={(evt) => props.setFecha(evt as Date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </label>
  );
}
