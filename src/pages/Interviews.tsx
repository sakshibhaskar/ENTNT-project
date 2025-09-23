import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Calendar as CalendarIcon, 
  Clock,
  Users,
  Video,
  MapPin,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

const mockInterviews = [
  {
    id: "1",
    candidate: "Priya Sharma",
    position: "Senior Frontend Developer",
    type: "Technical Interview",
    date: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: 60,
    location: "Conference Room A",
    meetingLink: "https://zoom.us/j/123456789",
    interviewers: ["rahul.gupta@company.com", "neha.singh@company.com"],
    status: "scheduled" as const,
    notes: "Focus on React and TypeScript skills"
  },
  {
    id: "2",
    candidate: "Arjun Patel",
    position: "UX Designer",
    type: "Portfolio Review",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
    duration: 45,
    location: "Remote",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    interviewers: ["deepika.design@company.com"],
    status: "scheduled" as const,
    notes: "Review portfolio and design thinking process"
  },
  {
    id: "3",
    candidate: "Kavya Reddy",
    position: "Product Manager",
    type: "Final Round",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    duration: 90,
    location: "Conference Room B",
    interviewers: ["vikram.ceo@company.com", "anita.cto@company.com"],
    status: "completed" as const,
    notes: "Leadership and strategic thinking assessment"
  },
  {
    id: "4",
    candidate: "Rohit Verma",
    position: "Backend Engineer",
    type: "Phone Screening",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    duration: 30,
    location: "Remote",
    interviewers: ["sneha.hr@company.com"],
    status: "completed" as const,
    notes: "Initial screening - passed"
  },
  {
    id: "5",
    candidate: "Aisha Khan",
    position: "Data Scientist",
    type: "Technical Interview",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    duration: 75,
    location: "Lab Room",
    interviewers: ["karan.data@company.com"],
    status: "scheduled" as const,
    notes: "Machine learning and statistics focus"
  },
  {
    id: "6",
    candidate: "Siddharth Jain",
    position: "Marketing Specialist",
    type: "Behavioral Interview",
    date: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    duration: 45,
    location: "Conference Room C",
    interviewers: ["ritu.marketing@company.com"],
    status: "no_show" as const,
    notes: "Candidate did not attend"
  }
];

const Interviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredInterviews = mockInterviews.filter((interview) => {
    const matchesSearch = interview.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         interview.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         interview.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || interview.status === statusFilter;
    const matchesType = typeFilter === "all" || interview.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "no_show":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "scheduled":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "no_show":
        return "bg-destructive text-destructive-foreground";
      case "scheduled":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTimeStatus = (date: Date) => {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    
    if (timeDiff > 24 * 60 * 60 * 1000) {
      return "upcoming";
    } else if (timeDiff > 0) {
      return "today";
    } else {
      return "past";
    }
  };

  const types = Array.from(new Set(mockInterviews.map(interview => interview.type)));
  const statusCounts = {
    all: mockInterviews.length,
    scheduled: mockInterviews.filter(i => i.status === "scheduled").length,
    completed: mockInterviews.filter(i => i.status === "completed").length,
    no_show: mockInterviews.filter(i => i.status === "no_show").length,
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Interviews</h1>
            <p className="text-muted-foreground">
              Manage and track all interview sessions
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary-dark shadow-elegant">
            <Plus className="mr-2 h-5 w-5" />
            Schedule Interview
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="no_show">No Show</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Interview Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Badge
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth px-4 py-2"
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')} ({count})
            </Badge>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredInterviews.length} of {mockInterviews.length} interviews
          </p>
        </div>

        {/* Interviews List */}
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <Card key={interview.id} className="shadow-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(interview.status)}
                      <h3 className="text-lg font-semibold">{interview.candidate}</h3>
                      <Badge 
                        className={`${getStatusColor(interview.status)} text-xs`}
                      >
                        {interview.status.replace('_', ' ')}
                      </Badge>
                      {getTimeStatus(interview.date) === "today" && (
                        <Badge variant="outline" className="text-xs border-warning text-warning">
                          Today
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{interview.position}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{format(interview.date, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{format(interview.date, "HH:mm")} ({interview.duration}min)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {interview.meetingLink ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <MapPin className="h-4 w-4" />
                        )}
                        <span>{interview.location}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Type:</span>
                        <Badge variant="outline" className="text-xs">
                          {interview.type}
                        </Badge>
                      </div>
                      
                      {interview.interviewers.length > 0 && (
                        <div className="flex items-center gap-2 text-sm mt-2">
                          <span className="font-medium">Interviewers:</span>
                          <div className="flex gap-1">
                            {interview.interviewers.map((interviewer, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {interviewer.split('@')[0]}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {interview.notes && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Notes:</span>
                          <p className="text-muted-foreground mt-1">{interview.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {interview.status === "scheduled" && (
                      <>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </>
                    )}
                    {interview.status === "completed" && (
                      <Button variant="outline" size="sm">
                        View Feedback
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredInterviews.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No interviews found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or schedule a new interview.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Your First Interview
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Interviews;