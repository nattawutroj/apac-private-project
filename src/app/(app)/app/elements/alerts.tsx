"use client";
import { TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/utils/supabase/subscribing";
import { toast } from "@/hooks/use-toast";

export const Alerts = () => {
  const channel = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
      },
      //   (payload) => console.log(payload)
      (payload) =>
        toast({
          variant: "destructive",
          title: payload.new.event_type,
          description: payload.new.even_description,
        })
    )
    .subscribe();

  console.log(channel);

  return (
    <Alert variant={"destructive"}>
      <TriangleAlertIcon className="h-4 w-4" />
      <AlertTitle>Bangkok, 6 min ago</AlertTitle>
      <AlertDescription>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger color="text-red-500">
              Gathering and Demonstrations
            </AccordionTrigger>
            <AccordionContent>
              More than 100 protesters from multiple political activist groups
              will demonstrate at the 14th October 1973 Memorial in Bangkok
              starting at 12:00 PM (local time) tomorrow. The protest aims to
              denounce Prime Minister Paetongtarn Shinawatra and former Prime
              Minister Thaksin Shinawatra.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </AlertDescription>
    </Alert>
  );
};
