
export type EventVisibility = 'public' | 'private';
export type EventStatus = 'confirmed' | 'canceled' | 'sold-out';

export interface EventUser {
  id: number;
  name: string;
  email: string;
  checkedIn: boolean;
}

export interface Event {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  maxAttendees: number;
  price: number;
  visibility: EventVisibility;
  status: EventStatus;
  createdBy: string;
  hasCheckin: boolean;
  registeredUsers: EventUser[];
  responsibleMembers: string[];
}
