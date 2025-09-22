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
import { Switch } from "@/components/ui/switch";
import { 
  Save, 
  Eye, 
  X, 
  Plus,
  MapPin,
  DollarSign,
  Clock,
  Users,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    salary: { min: "", max: "" },
    description: "",
    requirements: "",
    benefits: "",
    tags: [] as string[],
    isRemote: false,
    isUrgent: false,
    status: "draft"
  });

  const [newTag, setNewTag] = useState("");

  const departments = ["Engineering", "Design", "Product", "Marketing", "Sales", "Analytics", "Operations"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead", "Executive"];

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (status: "draft" | "active") => {
    setFormData(prev => ({ ...prev, status }));
    // Handle form submission logic here
    console.log("Job saved with status:", status, formData);
    navigate("/jobs");
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/jobs")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Create New Job</h1>
              <p className="text-muted-foreground">Fill in the details to post a new job opening</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" onClick={() => handleSubmit("draft")}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={() => handleSubmit("active")}>
              Publish Job
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Employment Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g. San Francisco, CA"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Salary Range</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Min salary"
                      value={formData.salary.min}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        salary: { ...prev.salary, min: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Max salary"
                      value={formData.salary.max}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        salary: { ...prev.salary, max: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the required skills, experience, and qualifications..."
                    value={formData.requirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="benefits">Benefits & Perks</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Health insurance, flexible hours, remote work options..."
                    value={formData.benefits}
                    onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Tags & Keywords</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Settings */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Job Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Remote Work</Label>
                    <p className="text-sm text-muted-foreground">Allow remote work</p>
                  </div>
                  <Switch
                    checked={formData.isRemote}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isRemote: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Urgent Hiring</Label>
                    <p className="text-sm text-muted-foreground">Mark as urgent priority</p>
                  </div>
                  <Switch
                    checked={formData.isUrgent}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isUrgent: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.location || "Location not set"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formData.salary.min && formData.salary.max 
                      ? `$${formData.salary.min} - $${formData.salary.max}`
                      : "Salary not set"
                    }
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.type || "Type not set"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formData.experience || "Experience not set"}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobForm;