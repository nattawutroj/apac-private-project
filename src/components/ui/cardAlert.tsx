import * as React from "react";

import { cn } from "@/lib/utils";

const CardAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
CardAlert.displayName = "CardAlert";

const CardAlertHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-between px-2 py-3", className)}
    {...props}
  />
));
CardAlertHeader.displayName = "CardAlertHeader";

const CardAlertTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardAlertTitle.displayName = "CardAlertTitle";

const CardAlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardAlertDescription.displayName = "CardAlertDescription";

const CardAlertContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-2 pt-0", className)} {...props} />
));
CardAlertContent.displayName = "CardAlertContent";

const CardAlertFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardAlertFooter.displayName = "CardAlertFooter";

export {
  CardAlert,
  CardAlertHeader,
  CardAlertFooter,
  CardAlertTitle,
  CardAlertDescription,
  CardAlertContent,
};
