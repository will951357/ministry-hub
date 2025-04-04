
import { ReactNode } from "react";

export interface Appointment {
  id: number;
  title: string;
  type: AppointmentType;
  date: Date;
  location: string;
  status: "confirmed" | "pending" | "cancelled";
}

export type AppointmentType = "visit" | "prayer" | "worship" | "social";

export interface AppointmentTypeInfo {
  label: string;
  color: "default" | "secondary" | "destructive" | "outline" | "visit" | "prayer" | "worship" | "social" | "pending" | "confirmed";
}

export const appointmentTypes: Record<AppointmentType, AppointmentTypeInfo> = {
  visit: { label: "Visits", color: "default" },
  prayer: { label: "Prayers", color: "secondary" },
  worship: { label: "Worship Services", color: "destructive" },
  social: { label: "Social Actions", color: "outline" }
};
