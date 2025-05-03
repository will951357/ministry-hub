
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, UserPlus, Calendar, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample notification data
const notifications = [
  {
    id: 1,
    type: "member",
    title: "New Member Conversion",
    message: "Jorge Santos has converted from visitor to member",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "appointment",
    title: "Appointment Request",
    message: "Maria Rodriguez requested a counseling session",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    type: "member",
    title: "New Family Registration",
    message: "The Johnson family registered 3 new members",
    time: "2 days ago",
    read: true,
  },
  {
    id: 4,
    type: "appointment",
    title: "Appointment Confirmed",
    message: "Pastor meeting with David Smith confirmed",
    time: "3 days ago",
    read: true,
  },
  {
    id: 5,
    type: "member",
    title: "First-Time Visitor",
    message: "Emily Wilson attended service for the first time",
    time: "1 week ago",
    read: true,
  }
];

export default function Notifications() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-church-primary">Notifications</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Mark all as read
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Clear all
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>
          
          <TabsContent value="unread" className="space-y-4">
            {notifications.filter(n => !n.read).map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>
          
          <TabsContent value="members" className="space-y-4">
            {notifications.filter(n => n.type === "member").map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4">
            {notifications.filter(n => n.type === "appointment").map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

function NotificationCard({ notification }) {
  const getIcon = () => {
    switch (notification.type) {
      case "member":
        return <UserPlus className="text-church-accent" size={20} />;
      case "appointment":
        return <Calendar className="text-church-primary" size={20} />;
      default:
        return <Bell className="text-church-secondary" size={20} />;
    }
  };

  return (
    <Card className={`border-l-4 ${notification.read ? 'border-l-gray-300' : 'border-l-church-accent'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="bg-gray-100 p-2 rounded-full">
            {getIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-church-primary'}`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {notification.time}
                </p>
              </div>
              
              <div className="flex gap-1">
                {!notification.read && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Check size={16} />
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500">
                  <X size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
