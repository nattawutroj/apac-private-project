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

export const AlertLatest = () => {
  const { Dvalue } = useDvalue();
  const { data } = useQuery({
    queryKey: ["latestAlert", Dvalue],
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

      const { data } = await query.limit(1).single();

      return data;
    },
  });

  const isValidDate = (date: string | undefined) => {
    return !isNaN(new Date(date || "").getTime());
  };

  if (data && isValidDate(data?.date)) {
    return (
      <CardAlert className="my-2">
        <CardAlertHeader>
          <CardAlertTitle>{data.source}</CardAlertTitle>
          <CardAlertDescription>
            {data?.place},
            {" " + formatDistanceToNow(new Date(data?.date || ""))} ago
          </CardAlertDescription>
        </CardAlertHeader>
        <CardAlertContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{data.event_type}</AccordionTrigger>
              <AccordionContent>{data.even_description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardAlertContent>
      </CardAlert>
    );
  }

  return null;
};
