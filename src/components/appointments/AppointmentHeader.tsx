
import { format, addMonths, subMonths } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
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
  viewMode?: "day" | "month";
  showMonthNavigation?: boolean;
}

export function AppointmentHeader({ 
  date, 
  appointmentCount, 
  onDateSelect,
  viewMode = "day",
  showMonthNavigation = false
}: AppointmentHeaderProps) {
  const navigateToPreviousMonth = () => {
    onDateSelect(subMonths(date, 1));
  };

  const navigateToNextMonth = () => {
    onDateSelect(addMonths(date, 1));
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center">
          {showMonthNavigation && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={navigateToPreviousMonth} 
              className="mr-1 p-0 h-8 w-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <CardTitle>
            Appointments for {format(date, viewMode === "day" ? 'MMMM d, yyyy' : 'MMMM yyyy')}
          </CardTitle>
          {showMonthNavigation && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={navigateToNextMonth} 
              className="ml-1 p-0 h-8 w-8"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
        <CardDescription>
          {appointmentCount} appointment{appointmentCount !== 1 ? 's' : ''}
        </CardDescription>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {format(date, viewMode === "day" ? 'MMM d, yyyy' : 'MMM yyyy')}
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
