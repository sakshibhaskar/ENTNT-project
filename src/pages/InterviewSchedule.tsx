import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Video,
  Plus,
  X,
  ArrowLeft,
  Send,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const InterviewSchedule = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    candidateId: "",
    jobId: "",
    title: "",
    type: "",
    duration: "60",
    location: "",
    meetingLink: "",
    interviewers: [] as string[],
    agenda: "",
    notes: "",
    time: "",
    timezone: "PST"
  });

  const [newInterviewer, setNewInterviewer] = useState("");

  const interviewTypes = [
    "Phone Screening", 
    "Technical Interview", 
    "Behavioral Interview", 
    "Final Round", 
    "Culture Fit", 
    "Panel Interview"
  ];

  const durations = ["30", "45", "60", "90", "120"];
  const timezones = ["PST", "EST", "CST", "MST", "UTC"];

  const addInterviewer = () => {
    if (newInterviewer.trim() && !formData.interviewers.includes(newInterviewer.trim())) {
      setFormData(prev => ({
        ...prev,
        interviewers: [...prev.interviewers, newInterviewer.trim()]
      }));
      setNewInterviewer("");
    }
  };

  const removeInterviewer = (interviewer: string) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.filter(i => i !== interviewer)
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Interview scheduled:", { ...formData, date });
    navigate("/interviews");
  };

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/interviews")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Schedule Interview</h1>
              <p className="text-muted-foreground">Set up a new interview session</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Send className="mr-2 h-4 w-4" />
              Send Invite
            </Button>
            <Button onClick={handleSubmit}>
              Schedule Interview
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="candidateId">Candidate *</Label>
                    <Select value={formData.candidateId} onValueChange={(value) => setFormData(prev => ({ ...prev, candidateId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select candidate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candidate1">Sarah Johnson</SelectItem>
                        <SelectItem value="candidate2">Mike Chen</SelectItem>
                        <SelectItem value="candidate3">Emily Davis</SelectItem>
                        <SelectItem value="candidate4">Alex Rivera</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="jobId">Position *</Label>
                    <Select value={formData.jobId} onValueChange={(value) => setFormData(prev => ({ ...prev, jobId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job1">Senior Frontend Developer</SelectItem>
                        <SelectItem value="job2">UX Designer</SelectItem>
                        <SelectItem value="job3">Product Manager</SelectItem>
                        <SelectItem value="job4">Backend Engineer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Interview Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Technical Interview - Frontend Developer"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Interview Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {interviewTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem key={duration} value={duration}>{duration} minutes</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date and Time */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Select Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="time">Select Time *</Label>
                    <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={formData.timezone} onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Location & Meeting Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Meeting Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. Conference Room A, 2nd Floor"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="meetingLink">Video Meeting Link</Label>
                  <Input
                    id="meetingLink"
                    placeholder="e.g. https://zoom.us/j/123456789"
                    value={formData.meetingLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interviewers */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Interviewers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add interviewer email..."
                    value={newInterviewer}
                    onChange={(e) => setNewInterviewer(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addInterviewer()}
                  />
                  <Button onClick={addInterviewer} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.interviewers.map((interviewer) => (
                    <Badge key={interviewer} variant="secondary" className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {interviewer}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeInterviewer(interviewer)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agenda & Notes */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Agenda & Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="agenda">Interview Agenda</Label>
                  <Textarea
                    id="agenda"
                    placeholder="What will be covered in this interview..."
                    value={formData.agenda}
                    onChange={(e) => setFormData(prev => ({ ...prev, agenda: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Internal notes for the interview team..."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interview Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Interview Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {date ? format(date, "MMM dd, yyyy") : "Date not selected"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formData.time ? `${formData.time} ${formData.timezone}` : "Time not selected"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.duration} minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.location || "Location not set"}</span>
                </div>
                {formData.meetingLink && (
                  <div className="flex items-center gap-3">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Video meeting</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Send className="mr-2 h-4 w-4" />
                  Send Calendar Invite
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Notify Team
                </Button>
              </CardContent>
            </Card>

            {/* Template Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm">
                  Load Technical Interview Template
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Load Behavioral Interview Template
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Load Final Round Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewSchedule;