"use client";

import React, { useContext, useEffect, useState } from "react";
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
import type { AppContextType, incidencia } from "@/@types/app";
import { AppContext } from "@/context/appContext";

interface DatePickProps {
  name: string,
  fecha: Date,
  setFecha: React.Dispatch<React.SetStateAction<Date |undefined>>
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
          <Calendar
            mode="single"
            selected={props.fecha}
            onSelect={props.setFecha}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </label>
  );
}
