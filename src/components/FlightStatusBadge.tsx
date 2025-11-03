import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, CheckCircle, XCircle, PlaneTakeoff, PlaneLanding, HelpCircle } from "lucide-react";
import type { Flight } from "@/lib/types";

interface FlightStatusBadgeProps {
  status: Flight['status'];
  className?: string;
}

export function FlightStatusBadge({ status, className }: FlightStatusBadgeProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'On Time':
        return {
          icon: <CheckCircle className="h-3 w-3" />,
          variant: 'success' as const,
          label: 'On Time'
        };
      case 'Delayed':
        return {
          icon: <Clock className="h-3 w-3" />,
          variant: 'accent' as const,
          label: 'Delayed'
        };
      case 'Cancelled':
        return {
          icon: <XCircle className="h-3 w-3" />,
          variant: 'destructive' as const,
          label: 'Cancelled'
        };
      case 'Departed':
         return {
          icon: <PlaneTakeoff className="h-3 w-3" />,
          variant: 'default' as const,
          label: 'Departed'
        };
       case 'Arrived':
         return {
          icon: <PlaneLanding className="h-3 w-3" />,
          variant: 'default' as const,
          label: 'Arrived'
        };
      default:
        return {
          icon: <HelpCircle className="h-3 w-3" />,
          variant: 'secondary' as const,
          label: status
        };
    }
  };

  const { icon, variant, label } = getStatusStyle();

  const variantClasses = {
    default: "bg-primary/20 text-primary border-primary/20",
    success: "bg-success/20 text-success border-success/20",
    accent: "bg-accent/20 text-accent-foreground border-accent/20",
    destructive: "bg-destructive/20 text-destructive border-destructive/20",
    secondary: "bg-secondary text-secondary-foreground border-secondary",
    outline: "text-foreground",
  };
  
  return (
    <Badge variant="outline" className={cn("flex items-center gap-1.5", variantClasses[variant], className)} >
      {icon}
      <span>{label}</span>
    </Badge>
  );
}

const badgeVariants = {
    success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
    accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
};