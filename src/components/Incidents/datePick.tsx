"use client";

import React, {useState} from "react";
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
  name: string
}

export default function DatePickerDemo(props: DatePickProps) {
  const [date, setDate] = useState<Date>();

  return (
    <label className="flex items-center gap-2.5">  
        <Popover>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
            )}
            >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>{props.name}</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            />
        </PopoverContent>
        </Popover>
    </label>
  );
}
