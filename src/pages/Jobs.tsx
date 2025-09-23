import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { JobCard } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  SlidersHorizontal,
  Briefcase
} from "lucide-react";

const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Bangalore, KA",
    type: "Full-time",
    salary: "₹15L - ₹20L",
    applicants: 24,
    status: "active" as const,
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    urgency: "high" as const,
  },
  {
    id: "2",
    title: "UX Designer",
    department: "Design",
    location: "Mumbai, MH",
    type: "Full-time",
    salary: "₹12L - ₹16L",
    applicants: 18,
    status: "active" as const,
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    urgency: "medium" as const,
  },
  {
    id: "3",
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    salary: "₹18L - ₹25L",
    applicants: 12,
    status: "draft" as const,
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Hyderabad, TG",
    type: "Full-time",
    salary: "₹14L - ₹18L",
    applicants: 31,
    status: "active" as const,
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    urgency: "low" as const,
  },
  {
    id: "5",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Delhi, DL",
    type: "Full-time",
    salary: "₹8L - ₹12L",
    applicants: 8,
    status: "closed" as const,
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    title: "Data Scientist",
    department: "Analytics",
    location: "Pune, MH",
    type: "Full-time",
    salary: "₹20L - ₹28L",
    applicants: 15,
    status: "active" as const,
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    urgency: "high" as const,
  },
];

const Jobs = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departments = Array.from(new Set(mockJobs.map(job => job.department)));
  const statusCounts = {
    all: mockJobs.length,
    active: mockJobs.filter(j => j.status === "active").length,
    draft: mockJobs.filter(j => j.status === "draft").length,
    closed: mockJobs.filter(j => j.status === "closed").length,
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Jobs</h1>
            <p className="text-muted-foreground">
              Manage your job postings and track applications
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary-dark shadow-elegant">
            <Plus className="mr-2 h-5 w-5" />
            Post New Job
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search jobs..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
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
              {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
            </Badge>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {mockJobs.length} jobs
          </p>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Jobs Grid/List */}
        <div className={`
          ${viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "space-y-4"
          }
        `}>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or create a new job posting.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Post Your First Job
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Jobs;