
import { useState } from "react";
import { format, isSameDay } from "date-fns";
import { DayProps } from "react-day-picker";
import { Appointment, appointmentTypes } from "@/types/appointment";
import { getAppointmentsForDate } from "@/data/appointments";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";

interface AppointmentCalendarProps {
  selectedDate: Date;
  appointments: Appointment[];
  onDateSelect: (date: Date) => void;
}

export function AppointmentCalendar({ 
  selectedDate, 
  appointments, 
  onDateSelect 
}: AppointmentCalendarProps) {
  // Custom day render for calendar with hover info
  const renderCalendarDay = (day: DayProps) => {
    const currentDate = day.date;
    if (!currentDate) return null;
    
    const dayAppointments = getAppointmentsForDate(currentDate, appointments);
    const hasAppointments = dayAppointments.length > 0;
    
    if (!hasAppointments) {
      return <div>{currentDate.getDate()}</div>;
    }
    
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="relative flex items-center justify-center">
            {currentDate.getDate()}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-0">
          <div className="p-3">
            <h4 className="font-semibold">{format(currentDate, 'MMMM d, yyyy')}</h4>
            <p className="text-xs text-muted-foreground mb-2">
              {dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-1">
              {dayAppointments.map((apt) => (
                <div key={apt.id} className="text-sm p-2 rounded-md bg-muted flex items-center justify-between">
                  <div>
                    <p className="font-medium">{apt.title}</p>
                    <p className="text-xs">{format(apt.date, 'h:mm a')} | {apt.location}</p>
                  </div>
                  <Badge variant={appointmentTypes[apt.type].color}>
                    {apt.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(newDate) => newDate && onDateSelect(newDate)}
        className="rounded-md pointer-events-auto"
        components={{
          Day: renderCalendarDay
        }}
      />
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Appointment Types</h3>
        <div className="flex flex-col space-y-2">
          {Object.entries(appointmentTypes).map(([key, { label, color }]) => (
            <div key={key} className="flex items-center">
              <Badge variant={color} className="mr-2 w-3 h-3 p-0" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
