"use client";

import { TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { useDvalue } from "@/providers/dvalue";

export const Alerts = () => {
  const { Dvalue } = useDvalue();
  const { data } = useQuery({
    queryKey: ["highRiskAlert", Dvalue],
    queryFn: async () => {
      const supabase = createClient();

      let query;

      query = supabase
        .from("alert")
        .select("*")
        .order("created_at", { ascending: false })
        .gte("risk", 5);

      if (Dvalue && Dvalue !== "All") {
        query = query.eq("area", Dvalue);
      }

      const { data } = await query.limit(1).single();

      return data;
    },
  });

  if (data)
    return (
      <Alert variant={"destructive"}>
        <TriangleAlertIcon className="h-4 w-4" />
        <AlertTitle>
          {data?.place},{" " + formatDistanceToNow(new Date(data?.date || 0))}{" "}
          ago
        </AlertTitle>
        <AlertDescription>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger color="text-red-500">
                {data.event_type}
              </AccordionTrigger>
              <AccordionContent>{data.even_description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </AlertDescription>
      </Alert>
    );

  return null;
};
