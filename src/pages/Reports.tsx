import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Download,
  Calendar,
  Target,
  PieChart
} from "lucide-react";

const Reports = () => {
  const reportData = {
    timeToHire: "32 days",
    costPerHire: "$4,200",
    offerAcceptanceRate: "78%",
    sourceEffectiveness: [
      { source: "LinkedIn", applications: 245, hires: 18, rate: "7.3%" },
      { source: "Indeed", applications: 189, hires: 12, rate: "6.3%" },
      { source: "Referrals", applications: 67, hires: 15, rate: "22.4%" },
      { source: "Company Website", applications: 156, hires: 8, rate: "5.1%" },
    ],
    hiringFunnelData: [
      { stage: "Applied", count: 657, conversion: "100%" },
      { stage: "Screening", count: 234, conversion: "35.6%" },
      { stage: "Technical", count: 89, conversion: "13.5%" },
      { stage: "Final", count: 53, conversion: "8.1%" },
      { stage: "Offer", count: 34, conversion: "5.2%" },
      { stage: "Hired", count: 28, conversion: "4.3%" },
    ]
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Hiring Reports</h1>
            <p className="text-muted-foreground">
              Analytics and insights for your hiring process
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time to Hire</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.timeToHire}</div>
              <p className="text-xs text-success">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                -3 days from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost per Hire</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.costPerHire}</div>
              <p className="text-xs text-success">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                -$200 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offer Acceptance</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.offerAcceptanceRate}</div>
              <p className="text-xs text-success">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-success">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +3 new this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hiring Funnel */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Hiring Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.hiringFunnelData.map((stage, index) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{stage.count}</span>
                        <Badge variant="outline" className="text-xs">
                          {stage.conversion}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: stage.conversion }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Source Effectiveness */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Source Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.sourceEffectiveness.map((source) => (
                  <div key={source.source} className="flex justify-between items-center p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium">{source.source}</h4>
                      <p className="text-sm text-muted-foreground">
                        {source.applications} applications → {source.hires} hires
                      </p>
                    </div>
                    <Badge 
                      variant={parseFloat(source.rate) > 10 ? "default" : "secondary"}
                      className="text-sm"
                    >
                      {source.rate}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Hiring Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Hiring Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Offer sent", candidate: "Sarah Johnson", job: "Senior Frontend Developer", time: "2 hours ago" },
                { action: "Interview completed", candidate: "Mike Chen", job: "UX Designer", time: "4 hours ago" },
                { action: "Application received", candidate: "Emily Davis", job: "Product Manager", time: "6 hours ago" },
                { action: "Candidate moved to final round", candidate: "Alex Rivera", job: "Backend Engineer", time: "1 day ago" },
                { action: "New job posted", candidate: "", job: "Data Scientist", time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-4 rounded-lg border hover:bg-muted/50 transition-smooth">
                  <div>
                    <h4 className="font-medium">{activity.action}</h4>
                    <p className="text-sm text-muted-foreground">
                      {activity.candidate && `${activity.candidate} • `}{activity.job}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;