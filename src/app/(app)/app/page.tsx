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
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import apacLogo from "@/assets/apac-logo.png";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Alerts } from "./elements/alerts";

export default async function AppPage() {
  const supabase = await createClient();
  const { data: reports } = await supabase.from("reports").select("*").single();
  return (
    <div className="container mt-2">
      <Alerts />
      <div className="my-4">
        <h1 className="text-2xl capitalize">latest incidents</h1>
        <CardAlert className="my-2">
          <CardAlertHeader>
            <CardAlertTitle>Emergency Alert</CardAlertTitle>
            <CardAlertDescription>Bangkok, 6 min ago</CardAlertDescription>
          </CardAlertHeader>
          <CardAlertContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Gathering and Demonstrations
                </AccordionTrigger>
                <AccordionContent>
                  More than 100 protesters from multiple political activist
                  groups will demonstrate at the 14th October 1973 Memorial in
                  Bangkok starting at 12:00 PM (local time) tomorrow. The
                  protest aims to denounce Prime Minister Paetongtarn Shinawatra
                  and former Prime Minister Thaksin Shinawatra.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardAlertContent>
        </CardAlert>
        <div className="my-2 pb-1 border-b">
          <h1 className="text-2xl py-2 capitalize">reports</h1>
          <Link
            href={reports?.pdf_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-full flex flex-col justify-center h-52 border">
              <Image
                src={apacLogo}
                alt="apceLogo"
                width={150}
                className="w-auto"
              />
            </div>
            <h3 className="text-xl capitalize">{reports?.title}</h3>
            <h4 className="text-sm">
              {reports?.place},
              {" " + formatDistanceToNow(new Date(reports?.created_at || ""))}{" "}
              ago
            </h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
