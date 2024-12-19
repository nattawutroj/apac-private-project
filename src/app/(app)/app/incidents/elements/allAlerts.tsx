"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CardAlert,
  CardAlertContent,
  CardAlertDescription,
  CardAlertHeader,
  CardAlertTitle,
} from "@/components/ui/cardAlert";
import { useDvalue } from "@/providers/dvalue";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

export const AllAlerts = ({ limit }: { limit?: number }) => {
  const { Dvalue } = useDvalue();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["AllAlerts", limit, Dvalue],
    queryFn: async () => {
      const supabase = createClient();

      let query;

      query = supabase
        .from("alert")
        .select("*")
        .order("created_at", { ascending: false });

      if (Dvalue && Dvalue !== "All") {
        query = query.eq("area", Dvalue);
      }

      if (limit) query = query.limit(limit);

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading alerts</div>;

  if (Array.isArray(data) && data.length > 0) {
    return (
      <>
        {data.map((a, k) => {
          return (
            <CardAlert key={k} className="my-2">
              <CardAlertHeader>
                <CardAlertTitle>{a.source}</CardAlertTitle>
                <CardAlertDescription>
                  {a?.place},
                  {" " + formatDistanceToNow(new Date(a?.date || ""))} ago
                </CardAlertDescription>
              </CardAlertHeader>
              <CardAlertContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{a.event_type}</AccordionTrigger>
                    <AccordionContent>{a.even_description}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardAlertContent>
            </CardAlert>
          );
        })}
      </>
    );
  }

  return <div>No alerts available</div>;
};
