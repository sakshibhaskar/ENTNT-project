import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const activities = [
  {
    id: 1,
    type: "application",
    candidate: {
      name: "Alex Johnson",
      avatar: "/avatars/alex.jpg",
      initials: "AJ",
    },
    position: "Senior Frontend Developer",
    action: "applied for",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "new",
  },
  {
    id: 2,
    type: "interview",
    candidate: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg", 
      initials: "SC",
    },
    position: "UX Designer",
    action: "completed interview for",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    status: "completed",
  },
  {
    id: 3,
    type: "hire",
    candidate: {
      name: "Mike Rodriguez",
      avatar: "/avatars/mike.jpg",
      initials: "MR",
    },
    position: "Backend Engineer",
    action: "was hired for",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: "hired",
  },
  {
    id: 4,
    type: "application",
    candidate: {
      name: "Emma Davis",
      avatar: "/avatars/emma.jpg",
      initials: "ED",
    },
    position: "Product Manager",
    action: "applied for",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: "new",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "new":
      return "default";
    case "completed":
      return "secondary";
    case "hired":
      return "default";
    default:
      return "secondary";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-primary text-primary-foreground";
    case "completed":
      return "bg-warning text-warning-foreground";
    case "hired":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const RecentActivity = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.candidate.avatar} alt={activity.candidate.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {activity.candidate.initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium truncate">
                  {activity.candidate.name}
                </p>
                <Badge 
                  variant={getStatusVariant(activity.status)}
                  className={getStatusColor(activity.status)}
                >
                  {activity.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.action} <span className="font-medium">{activity.position}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};