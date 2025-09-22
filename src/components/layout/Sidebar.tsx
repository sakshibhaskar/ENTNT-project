import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Briefcase,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Plus,
  Home,
  UserCheck,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Jobs",
    href: "/jobs", 
    icon: Briefcase,
    badge: "12",
  },
  {
    title: "Candidates",
    href: "/candidates",
    icon: Users,
    badge: "47",
  },
  {
    title: "Interviews", 
    href: "/interviews",
    icon: Calendar,
    badge: "5",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

const quickActions = [
  {
    title: "Post New Job",
    href: "/jobs/new",
    icon: Plus,
  },
  {
    title: "Add Candidate",
    href: "/candidates/new", 
    icon: UserCheck,
  },
  {
    title: "Schedule Interview",
    href: "/interviews/new",
    icon: Calendar,
  },
];

const secondaryItems = [
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    badge: "3",
  },
  {
    title: "Templates",
    href: "/templates",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Main Navigation */}
        <div className="flex-1 space-y-4 py-6 px-3">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavLink key={item.href} to={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-smooth hover-lift",
                    collapsed && "justify-center px-2",
                    isActive(item.href) && "bg-primary/10 text-primary border-primary/20"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </NavLink>
            ))}
          </div>

          {/* Quick Actions */}
          {!collapsed && (
            <div>
              <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Quick Actions
              </h3>
              <div className="space-y-1">
                {quickActions.map((item) => (
                  <NavLink key={item.href} to={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-sm transition-smooth hover-lift"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Button>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Secondary Navigation */}
        <div className="border-t px-3 py-4">
          <div className="space-y-1">
            {secondaryItems.map((item) => (
              <NavLink key={item.href} to={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-smooth",
                    collapsed && "justify-center px-2",
                    isActive(item.href) && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};