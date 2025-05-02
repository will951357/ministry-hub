
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { EventListItem } from '../events/EventListItem';
import { EventDetailsModal } from '../events/EventDetailsModal';
import { CheckinQRModal } from '../events/CheckinQRModal';
import { CancelEventDialog } from '../events/CancelEventDialog';
import { DataFilters, FilterValues } from "@/components/shared/DataFilters";
import { isSameMonth } from 'date-fns';

// Example events data with more realistic information
const events = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: new Date(2025, 3, 21), // April 21, 2025
    time: '10:00 AM - 12:00 PM',
    location: 'Main Sanctuary',
    attendees: 120,
    maxAttendees: 200,
    price: 0,
    visibility: 'public' as const,
    status: 'confirmed',
    hasCheckin: true,
    description: 'Weekly worship service with praise and sermon. All are welcome to join us for a time of worship and fellowship.',
    registeredUsers: [
      { id: 1, name: 'John Smith', email: 'john@example.com', checkedIn: true },
      { id: 2, name: 'Mary Johnson', email: 'mary@example.com', checkedIn: false },
      { id: 3, name: 'Robert Williams', email: 'robert@example.com', checkedIn: true },
      { id: 4, name: 'Sarah Brown', email: 'sarah@example.com', checkedIn: false }
    ],
    responsibleMembers: ['Pastor John', 'Worship Leader']
  },
  {
    id: 2,
    title: 'Youth Group Meeting',
    date: new Date(2025, 3, 22), // April 22, 2025
    time: '6:00 PM - 8:00 PM',
    location: 'Youth Center',
    attendees: 35,
    maxAttendees: 50,
    price: 0,
    visibility: 'public' as const,
    status: 'confirmed',
    hasCheckin: false,
    description: 'Weekly youth group meeting with games, worship, and Bible study for teenagers.',
    registeredUsers: [
      { id: 5, name: 'Mike Thomas', email: 'mike@example.com', checkedIn: false },
      { id: 6, name: 'Jessica Wilson', email: 'jessica@example.com', checkedIn: false }
    ],
    responsibleMembers: ['Youth Pastor']
  },
  {
    id: 3,
    title: 'Prayer Meeting',
    date: new Date(2025, 3, 18), // April 18, 2025
    time: '7:00 PM - 8:30 PM',
    location: 'Chapel',
    attendees: 45,
    maxAttendees: 60,
    price: 0,
    visibility: 'public' as const,
    status: 'confirmed',
    hasCheckin: true,
    description: 'Weekly prayer meeting for church members and guests. Join us as we pray for our church, community, and world.',
    registeredUsers: [
      { id: 7, name: 'David Clark', email: 'david@example.com', checkedIn: true },
      { id: 8, name: 'Lisa Adams', email: 'lisa@example.com', checkedIn: true },
      { id: 9, name: 'James Miller', email: 'james@example.com', checkedIn: false }
    ],
    responsibleMembers: ['Prayer Team Leader']
  },
  {
    id: 4,
    title: 'Leadership Retreat (Private)',
    date: new Date(2025, 3, 25), // April 25, 2025
    time: '9:00 AM - 5:00 PM',
    location: 'Mountain Retreat Center',
    attendees: 15,
    maxAttendees: 20,
    price: 75,
    visibility: 'private' as const,
    status: 'confirmed',
    hasCheckin: true,
    description: 'Annual leadership retreat for church leaders and staff. This is a private event for leadership development and planning.',
    registeredUsers: [
      { id: 10, name: 'Pastor John', email: 'pastorjohn@example.com', checkedIn: false },
      { id: 11, name: 'Elder Smith', email: 'elder@example.com', checkedIn: false },
      { id: 12, name: 'Deacon Brown', email: 'deacon@example.com', checkedIn: false }
    ],
    responsibleMembers: ['Senior Pastor', 'Church Administrator']
  },
];

export function EventList() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showCheckinQR, setShowCheckinQR] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const { toast } = useToast();

  const filterOptions = [
    {
      id: "date",
      type: "date" as const,
      label: "Date",
      description: "Filter by event date"
    },
    {
      id: "category",
      type: "payment" as const,
      label: "Category",
      description: "Filter by event category"
    }
  ];

  const categoryOptions = [
    { value: "worship", label: "Worship" },
    { value: "youth", label: "Youth" },
    { value: "leadership", label: "Leadership" },
    { value: "prayer", label: "Prayer" }
  ];

  const handleFilterChange = (filters: FilterValues) => {
    setFilterValues(filters);
  };

  const filteredEvents = React.useMemo(() => {
    return events.filter(event => {
      // Apply date filter
      let matchesDateFilter = true;
      if (filterValues.dateCondition && filterValues.startDate) {
        if (filterValues.dateCondition === 'on') {
          matchesDateFilter = isSameMonth(event.date, filterValues.startDate);
        } else if (filterValues.dateCondition === 'between' && filterValues.endDate) {
          const eventDate = new Date(event.date);
          const startDate = new Date(filterValues.startDate);
          const endDate = new Date(filterValues.endDate);
          matchesDateFilter = eventDate >= startDate && eventDate <= endDate;
        }
      }

      return matchesDateFilter;
    });
  }, [filterValues]);

  const handleCancelEvent = (eventId: number) => {
    toast({
      title: "Event Canceled",
      description: "The event has been successfully canceled.",
    });
  };

  const handleGenerateQRCode = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setShowCheckinQR(true);
  };

  const handleViewDetails = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleEditEvent = (eventId: number) => {
    toast({
      title: "Edit Event",
      description: `Editing event with ID: ${eventId}`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Upcoming Events</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <DataFilters 
            onFilterChange={handleFilterChange} 
            filterOptions={filterOptions}
            paymentMethods={categoryOptions}
          />

          <div className="space-y-4 mt-4">
            {filteredEvents.map((event) => (
              <EventListItem
                key={event.id}
                event={event}
                onViewDetails={handleViewDetails}
                onGenerateQRCode={handleGenerateQRCode}
                onEditEvent={handleEditEvent}
                onCancelEvent={handleCancelEvent}
              />
            ))}
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No events found matching your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      <EventDetailsModal 
        open={showEventDetails} 
        onOpenChange={setShowEventDetails} 
        event={selectedEvent}
        onEditEvent={handleEditEvent}
        onCancelEvent={handleCancelEvent}
        onGenerateQRCode={handleGenerateQRCode}
        AlertDialogContent={
          selectedEvent ? (
            <CancelEventDialog 
              eventTitle={selectedEvent.title} 
              onConfirm={() => handleCancelEvent(selectedEvent.id)} 
            />
          ) : null
        }
      />

      {/* Check-in QR Code Modal */}
      <CheckinQRModal
        open={showCheckinQR}
        onOpenChange={setShowCheckinQR}
        event={selectedEvent}
      />
    </>
  );
}
