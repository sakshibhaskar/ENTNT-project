import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Upload, 
  X, 
  Plus,
  User,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  FileText,
  Globe,
  Linkedin
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CandidateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    currentRole: "",
    experience: "",
    expectedSalary: "",
    notice: "",
    resume: null as File | null,
    coverLetter: "",
    skills: [] as string[],
    websites: {
      portfolio: "",
      linkedin: "",
      github: ""
    },
    jobId: "",
    source: "",
    notes: ""
  });

  const [newSkill, setNewSkill] = useState("");

  const experienceLevels = ["0-1 years", "2-3 years", "4-5 years", "6-10 years", "10+ years"];
  const noticePeriods = ["Immediate", "2 weeks", "1 month", "2 months", "3 months"];
  const sources = ["LinkedIn", "Indeed", "Company Website", "Referral", "Job Board", "Other"];

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Candidate saved:", formData);
    navigate("/candidates");
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/candidates")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Add New Candidate</h1>
              <p className="text-muted-foreground">Add a candidate to your talent pool</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={handleSubmit}>
              Add Candidate
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentRole">Current Role</Label>
                  <Input
                    id="currentRole"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.currentRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="expectedSalary">Expected Salary</Label>
                    <Input
                      id="expectedSalary"
                      placeholder="e.g. $120,000"
                      value={formData.expectedSalary}
                      onChange={(e) => setFormData(prev => ({ ...prev, expectedSalary: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notice">Notice Period</Label>
                  <Select value={formData.notice} onValueChange={(value) => setFormData(prev => ({ ...prev, notice: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notice period" />
                    </SelectTrigger>
                    <SelectContent>
                      {noticePeriods.map((period) => (
                        <SelectItem key={period} value={period}>{period}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents & Links */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Documents & Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="resume">Resume</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary file:text-primary-foreground"
                    />
                    {formData.resume && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {formData.resume.name}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="portfolio">Portfolio Website</Label>
                  <Input
                    id="portfolio"
                    placeholder="https://johndoe.com"
                    value={formData.websites.portfolio}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      websites: { ...prev.websites, portfolio: e.target.value }
                    }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/johndoe"
                      value={formData.websites.linkedin}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        websites: { ...prev.websites, linkedin: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/johndoe"
                      value={formData.websites.github}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        websites: { ...prev.websites, github: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="coverLetter">Cover Letter / Notes</Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Additional information about the candidate..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jobId">Applying for Job</Label>
                  <Select value={formData.jobId} onValueChange={(value) => setFormData(prev => ({ ...prev, jobId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="job1">Senior Frontend Developer</SelectItem>
                      <SelectItem value="job2">UX Designer</SelectItem>
                      <SelectItem value="job3">Product Manager</SelectItem>
                      <SelectItem value="job4">Backend Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="source">Source</Label>
                  <Select value={formData.source} onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="How did they find us?" />
                    </SelectTrigger>
                    <SelectContent>
                      {sources.map((source) => (
                        <SelectItem key={source} value={source}>{source}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add internal notes about this candidate..."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contact Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.email || "Email not provided"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.phone || "Phone not provided"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.location || "Location not provided"}</span>
                </div>
                {formData.websites.linkedin && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">LinkedIn profile</span>
                  </div>
                )}
                {formData.websites.portfolio && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Portfolio website</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CandidateForm;