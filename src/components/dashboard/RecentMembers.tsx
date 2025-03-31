
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Example recent members data
const recentMembers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    joined: '2 days ago',
    avatar: 'JS',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    joined: '1 week ago',
    avatar: 'MG',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    joined: '1 week ago',
    avatar: 'RJ',
  },
  {
    id: 4,
    name: 'Lisa Wang',
    email: 'lisa.wang@example.com',
    joined: '2 weeks ago',
    avatar: 'LW',
  },
];

export function RecentMembers() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Members</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="hidden sm:block text-sm text-muted-foreground">
                Joined {member.joined}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
