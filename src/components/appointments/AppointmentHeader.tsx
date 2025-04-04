
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";

interface AppointmentHeaderProps {
  date: Date;
  appointmentCount: number;
  onDateSelect: (date: Date) => void;
}

export function AppointmentHeader({ 
  date, 
  appointmentCount, 
  onDateSelect 
}: AppointmentHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle>Appointments for {format(date, 'MMMM d, yyyy')}</CardTitle>
        <CardDescription>
          {appointmentCount} appointment{appointmentCount !== 1 ? 's' : ''}
        </CardDescription>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {format(date, 'MMM d, yyyy')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && onDateSelect(newDate)}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
