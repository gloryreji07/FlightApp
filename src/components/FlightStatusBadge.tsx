import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, CheckCircle, XCircle, PlaneTakeoff, PlaneLanding, HelpCircle, AlertTriangle } from "lucide-react";
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
       case 'Boarding':
         return {
          icon: <AlertTriangle className="h-3 w-3" />,
          variant: 'accent' as const,
          label: 'Boarding'
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
    default: "bg-primary/20 text-primary-foreground border-primary/20",
    success: "bg-green-500/20 text-green-400 border-green-500/20",
    accent: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
    destructive: "bg-red-500/20 text-red-400 border-red-500/20",
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
