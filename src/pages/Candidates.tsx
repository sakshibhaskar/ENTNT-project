import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CandidateCard } from "@/components/candidates/CandidateCard";
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
  Users,
  Upload
} from "lucide-react";

const mockCandidates = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    status: "new" as const,
    rating: 4.8,
    appliedPosition: "Senior Frontend Developer",
    avatar: "/avatars/alex.jpg",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 234-5678",
    position: "UX Designer",
    location: "New York, NY",
    experience: "4+ years",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    status: "interview" as const,
    rating: 4.9,
    appliedPosition: "UX Designer",
    avatar: "/avatars/sarah.jpg",
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    email: "mike.rodriguez@email.com",
    phone: "+1 (555) 345-6789",
    position: "Backend Engineer",
    location: "Austin, TX",
    experience: "6+ years",
    skills: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes"],
    status: "hired" as const,
    rating: 4.7,
    appliedPosition: "Backend Engineer",
    avatar: "/avatars/mike.jpg",
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 456-7890",
    position: "Product Manager",
    location: "Remote",
    experience: "7+ years",
    skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
    status: "offer" as const,
    rating: 4.6,
    appliedPosition: "Product Manager",
    avatar: "/avatars/emma.jpg",
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 567-8901",
    position: "Data Scientist",
    location: "Seattle, WA",
    experience: "3+ years",
    skills: ["Python", "R", "Machine Learning", "SQL", "Tableau"],
    status: "screening" as const,
    rating: 4.4,
    appliedPosition: "Data Scientist",
    avatar: "/avatars/james.jpg",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 678-9012",
    position: "Marketing Specialist",
    location: "Los Angeles, CA",
    experience: "2+ years",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    status: "rejected" as const,
    rating: 3.8,
    appliedPosition: "Marketing Specialist",
    avatar: "/avatars/lisa.jpg",
  },
];

const Candidates = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    const matchesPosition = positionFilter === "all" || candidate.appliedPosition === positionFilter;
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const positions = Array.from(new Set(mockCandidates.map(candidate => candidate.appliedPosition)));
  const statusCounts = {
    all: mockCandidates.length,
    new: mockCandidates.filter(c => c.status === "new").length,
    screening: mockCandidates.filter(c => c.status === "screening").length,
    interview: mockCandidates.filter(c => c.status === "interview").length,
    offer: mockCandidates.filter(c => c.status === "offer").length,
    hired: mockCandidates.filter(c => c.status === "hired").length,
    rejected: mockCandidates.filter(c => c.status === "rejected").length,
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Candidates</h1>
            <p className="text-muted-foreground">
              Manage your candidate pipeline and track applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary-dark shadow-elegant">
              <Plus className="mr-2 h-5 w-5" />
              Add Candidate
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search candidates by name, skills, or position..."
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
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
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Badge
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth px-4 py-2 whitespace-nowrap"
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
            </Badge>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCandidates.length} of {mockCandidates.length} candidates
          </p>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Candidates Grid/List */}
        <div className={`
          ${viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "space-y-4"
          }
        `}>
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No candidates found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or add new candidates to your pipeline.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Candidate
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Candidates;