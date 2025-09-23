import { Layout } from "@/components/layout/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { HiringFunnel } from "@/components/dashboard/HiringFunnel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Plus,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
          <img 
            src={heroImage} 
            alt="Team collaboration" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative px-8 py-12 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">
                Welcome back, Priya! 👋
              </h1>
              <p className="text-xl opacity-90 mb-6">
                You have 5 interviews scheduled today and 12 new applications to review.
              </p>
              <div className="flex gap-4">
                <Button variant="secondary" size="lg" className="shadow-lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Post New Job
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  View Calendar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Candidates"
            value="1,247"
            icon={<Users className="h-5 w-5" />}
            change={{ value: "+12%", trend: "up" }}
          />
          <StatsCard
            title="Active Jobs"
            value="23"
            icon={<Briefcase className="h-5 w-5" />}
            change={{ value: "+3", trend: "up" }}
          />
          <StatsCard
            title="Interviews This Week"
            value="18"
            icon={<Calendar className="h-5 w-5" />}
            change={{ value: "+5", trend: "up" }}
          />
          <StatsCard
            title="Hire Rate"
            value="68%"
            icon={<TrendingUp className="h-5 w-5" />}
            change={{ value: "+2%", trend: "up" }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activities & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <RecentActivity />
            
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex-col gap-2 hover-lift transition-smooth">
                    <Plus className="h-6 w-6" />
                    <span>Post Job</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 hover-lift transition-smooth">
                    <Users className="h-6 w-6" />
                    <span>Add Candidate</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 hover-lift transition-smooth">
                    <Calendar className="h-6 w-6" />
                    <span>Schedule Interview</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Hiring Funnel */}
          <div>
            <HiringFunnel />
          </div>
        </div>

        {/* Bottom Section - Recent Jobs */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Jobs</CardTitle>
            <Button variant="ghost">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Senior Frontend Developer", applicants: 24, status: "active" },
                { title: "UX Designer", applicants: 18, status: "active" },
                { title: "Product Manager", applicants: 12, status: "draft" },
                { title: "Backend Engineer", applicants: 31, status: "active" },
              ].map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-smooth">
                  <div>
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">{job.applicants} applicants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === "active" 
                        ? "bg-success text-success-foreground" 
                        : "bg-warning text-warning-foreground"
                    }`}>
                      {job.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;