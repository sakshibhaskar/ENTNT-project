import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  className?: string;
}

export const StatsCard = ({ title, value, icon, change, className }: StatsCardProps) => {
  return (
    <Card className={cn("shadow-card hover-lift transition-smooth", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant={change.trend === "up" ? "default" : change.trend === "down" ? "destructive" : "secondary"}
              className={cn(
                "text-xs",
                change.trend === "up" && "bg-success text-success-foreground",
                change.trend === "neutral" && "bg-muted text-muted-foreground"
              )}
            >
              {change.trend === "up" && "↗"}
              {change.trend === "down" && "↘"}
              {change.trend === "neutral" && "→"}
              {change.value}
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};