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
    default: "bg-primary/20 text-primary-foreground border-transparent hover:bg-primary/30",
    success: "bg-success/20 text-success-foreground border-transparent hover:bg-success/30",
    accent: "bg-accent/20 text-accent-foreground border-transparent hover:bg-accent/30",
    destructive: "bg-destructive/20 text-destructive-foreground border-transparent hover:bg-destructive/30",
    secondary: "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80",
    outline: "text-foreground",
  };
  
  // Customizing text colors for better contrast on light backgrounds
  const textVariantClasses = {
      default: "text-primary",
      success: "text-success",
      accent: "text-accent-foreground", // accent is dark, so use its foreground
      destructive: "text-destructive",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
  }
  
  const textColor = textVariantClasses[variant] || 'text-foreground';

  return (
    <Badge className={cn("flex items-center gap-1.5", variantClasses[variant], textColor, className)} >
      {icon}
      <span>{label}</span>
    </Badge>
  );
}

// Need to define custom badge variants in tailwind config or here.
// For now, using direct classes.
// In badge.tsx, variant can be extended. Here I will use custom classes.
const badgeVariants = {
    success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
    accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
};