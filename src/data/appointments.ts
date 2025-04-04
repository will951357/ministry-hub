
import { Appointment } from "@/types/appointment";

// Sample appointment data
export const appointments: Appointment[] = [
  {
    id: 1,
    title: "Home Visit - Johnson Family",
    type: "visit",
    date: new Date(2025, 3, 5, 10, 0),
    location: "123 Main St",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Prayer Meeting - Hospital",
    type: "prayer",
    date: new Date(2025, 3, 5, 14, 30),
    location: "Memorial Hospital, Room 305",
    status: "pending",
  },
  {
    id: 3,
    title: "Youth Worship Practice",
    type: "worship",
    date: new Date(2025, 3, 6, 18, 0),
    location: "Church Sanctuary",
    status: "confirmed",
  },
  {
    id: 4,
    title: "Food Bank Volunteer",
    type: "social",
    date: new Date(2025, 3, 8, 9, 0),
    location: "Community Center",
    status: "confirmed",
  },
  {
    id: 5,
    title: "Counseling Session - Smith",
    type: "visit",
    date: new Date(2025, 3, 10, 13, 0),
    location: "Pastor's Office",
    status: "confirmed",
  }
];

// Helper functions for appointment data
export const getAppointmentsForDate = (date: Date, appointments: Appointment[]) => {
  return appointments.filter(appointment => 
    isSameDay(appointment.date, date)
  );
};

export const filterAppointmentsByType = (appointments: Appointment[], type?: string) => {
  return type && type !== "all" 
    ? appointments.filter(app => app.type === type)
    : appointments;
};

// Date utility function
import { isSameDay } from "date-fns";
