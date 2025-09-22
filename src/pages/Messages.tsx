import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Search, 
  Send,
  Paperclip,
  Star,
  Archive,
  Reply,
  Forward,
  MoreHorizontal,
  MessageSquare,
  Clock,
  CheckCheck
} from "lucide-react";
import { format } from "date-fns";

const mockMessages = [
  {
    id: "1",
    subject: "Interview Feedback - Sarah Johnson",
    sender: "John Doe",
    email: "john.doe@company.com",
    avatar: "",
    preview: "Great technical skills, would recommend moving to final round...",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    isStarred: true,
    attachments: 1,
    type: "interview_feedback"
  },
  {
    id: "2",
    subject: "New Application - Frontend Developer",
    sender: "Mike Chen",
    email: "mike.chen@email.com",
    avatar: "",
    preview: "Hi, I'm interested in the Senior Frontend Developer position...",
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: true,
    isStarred: false,
    attachments: 2,
    type: "application"
  },
  {
    id: "3",
    subject: "Interview Reschedule Request",
    sender: "Emily Davis",
    email: "emily.davis@email.com",
    avatar: "",
    preview: "Could we reschedule our interview for next week? I have a conflict...",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    isStarred: false,
    attachments: 0,
    type: "schedule"
  },
  {
    id: "4",
    subject: "Offer Acceptance - Product Manager",
    sender: "Alex Rivera",
    email: "alex.rivera@email.com",
    avatar: "",
    preview: "Thank you for the offer! I'm excited to accept and join the team...",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isRead: false,
    isStarred: true,
    attachments: 0,
    type: "offer"
  },
  {
    id: "5",
    subject: "Follow-up on UX Designer Position",
    sender: "Jessica Kim",
    email: "jessica.kim@email.com",
    avatar: "",
    preview: "I wanted to follow up on my application submitted last week...",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isRead: true,
    isStarred: false,
    attachments: 0,
    type: "followup"
  }
];

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(mockMessages[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [replyText, setReplyText] = useState("");

  const filteredMessages = mockMessages.filter((message) => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || message.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "interview_feedback":
        return "bg-blue-100 text-blue-800";
      case "application":
        return "bg-green-100 text-green-800";
      case "schedule":
        return "bg-yellow-100 text-yellow-800";
      case "offer":
        return "bg-purple-100 text-purple-800";
      case "followup":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "interview_feedback":
        return "Feedback";
      case "application":
        return "Application";
      case "schedule":
        return "Schedule";
      case "offer":
        return "Offer";
      case "followup":
        return "Follow-up";
      default:
        return "General";
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex">
        {/* Message List Sidebar */}
        <div className="w-1/3 border-r bg-background flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Messages</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Compose
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="application">Applications</SelectItem>
                <SelectItem value="interview_feedback">Interview Feedback</SelectItem>
                <SelectItem value="schedule">Scheduling</SelectItem>
                <SelectItem value="offer">Offers</SelectItem>
                <SelectItem value="followup">Follow-ups</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedMessage?.id === message.id ? "bg-muted" : ""
                } ${!message.isRead ? "bg-blue-50" : ""}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>
                      {message.sender.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm truncate ${!message.isRead ? "font-semibold" : "font-medium"}`}>
                        {message.sender}
                      </h4>
                      <div className="flex items-center gap-1">
                        {message.isStarred && (
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {format(message.date, "HH:mm")}
                        </span>
                      </div>
                    </div>
                    
                    <h5 className={`text-sm mb-1 truncate ${!message.isRead ? "font-medium" : ""}`}>
                      {message.subject}
                    </h5>
                    
                    <p className="text-xs text-muted-foreground truncate mb-2">
                      {message.preview}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`text-xs ${getTypeColor(message.type)}`}>
                        {getTypeLabel(message.type)}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {message.attachments > 0 && (
                          <Paperclip className="h-3 w-3 text-muted-foreground" />
                        )}
                        {!message.isRead && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 flex flex-col">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedMessage.avatar} />
                      <AvatarFallback>
                        {selectedMessage.sender.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedMessage.sender}</h3>
                      <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Star className={`h-4 w-4 ${selectedMessage.isStarred ? "text-yellow-500 fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {format(selectedMessage.date, "MMM dd, yyyy 'at' HH:mm")}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={getTypeColor(selectedMessage.type)}>
                    {getTypeLabel(selectedMessage.type)}
                  </Badge>
                  {selectedMessage.attachments > 0 && (
                    <Badge variant="outline">
                      <Paperclip className="h-3 w-3 mr-1" />
                      {selectedMessage.attachments} attachment{selectedMessage.attachments > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-none prose prose-sm">
                  <p className="mb-4">
                    {selectedMessage.preview}
                  </p>
                  
                  {/* Mock email content based on type */}
                  {selectedMessage.type === "interview_feedback" && (
                    <div className="space-y-4">
                      <p>
                        I wanted to share my feedback from the technical interview with Sarah Johnson 
                        for the Senior Frontend Developer position.
                      </p>
                      <p><strong>Technical Skills:</strong> Excellent knowledge of React, TypeScript, and modern web development practices.</p>
                      <p><strong>Problem Solving:</strong> Demonstrated clear thinking and systematic approach to coding challenges.</p>
                      <p><strong>Communication:</strong> Articulated technical concepts well and asked thoughtful questions.</p>
                      <p><strong>Recommendation:</strong> Strong recommendation to proceed to final round.</p>
                    </div>
                  )}
                  
                  {selectedMessage.type === "application" && (
                    <div className="space-y-4">
                      <p>Dear Hiring Manager,</p>
                      <p>
                        I am writing to express my interest in the Senior Frontend Developer position 
                        at your company. With over 5 years of experience in React development, I believe 
                        I would be a great fit for your team.
                      </p>
                      <p>
                        Please find my resume and portfolio attached. I look forward to hearing from you.
                      </p>
                      <p>Best regards,<br/>Mike Chen</p>
                    </div>
                  )}
                  
                  {selectedMessage.type === "offer" && (
                    <div className="space-y-4">
                      <p>Dear Hiring Team,</p>
                      <p>
                        Thank you so much for extending the offer for the Product Manager position. 
                        I am thrilled to accept and look forward to contributing to the team's success.
                      </p>
                      <p>
                        As discussed, my start date will be in two weeks. Please let me know if there 
                        are any documents or preparations needed before then.
                      </p>
                      <p>Best regards,<br/>Alex Rivera</p>
                    </div>
                  )}
                </div>
                
                {/* Attachments */}
                {selectedMessage.attachments > 0 && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Attachments</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Paperclip className="h-4 w-4" />
                        <span>resume_mike_chen.pdf</span>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                      {selectedMessage.attachments > 1 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Paperclip className="h-4 w-4" />
                          <span>portfolio_examples.pdf</span>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Reply Section */}
              <div className="p-6 border-t">
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" size="sm">
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    <Forward className="h-4 w-4 mr-2" />
                    Forward
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                  />
                  <div className="flex justify-between items-center">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Attach File
                    </Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a message</h3>
                <p className="text-muted-foreground">Choose a message from the list to view its content</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;