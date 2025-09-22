import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const funnelStages = [
  {
    stage: "Applications",
    count: 284,
    percentage: 100,
    color: "bg-primary",
  },
  {
    stage: "Screening",
    count: 142,
    percentage: 50,
    color: "bg-secondary",
  },
  {
    stage: "First Interview",
    count: 68,
    percentage: 24,
    color: "bg-warning",
  },
  {
    stage: "Final Interview",
    count: 34,
    percentage: 12,
    color: "bg-success",
  },
  {
    stage: "Offers",
    count: 12,
    percentage: 4,
    color: "bg-purple-500",
  },
  {
    stage: "Hired",
    count: 8,
    percentage: 3,
    color: "bg-emerald-500",
  },
];

export const HiringFunnel = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Hiring Funnel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {funnelStages.map((stage, index) => (
          <div key={stage.stage} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{stage.stage}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{stage.count}</span>
                <span className="text-xs text-muted-foreground">({stage.percentage}%)</span>
              </div>
            </div>
            <Progress 
              value={stage.percentage} 
              className="h-2"
              style={{
                // @ts-ignore
                '--progress-foreground': stage.color.replace('bg-', ''),
              }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};