import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import apacLogo from "@/assets/apac-logo.png";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Alerts } from "./elements/alerts";
import { AlertLatest } from "./elements/alertLatest";
import { AllAlerts } from "./incidents/elements/allAlerts";

import Map from "./elements/heatmap";

export default async function AppPage() {
  const supabase = await createClient();
  const { data: reportsFortnightly } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("type", "fortnightly")
    .single();

  const { data: reportsSemiMonthly } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("type", "Semi-Monthly")
    .single();
  return (
    <div className="container mt-2">
      <Alerts />
      <div className="my-2 md:flex md:flex-row-reverse md:justify-between md:gap-6">
        <div className="hidden md:block md:w-1/3 md:h-[60vh] ">
          <Map />
        </div>
        <div className="md:w-1/3">
          <h1 className="text-2xl capitalize">latest incidents</h1>
          <div className="md:hidden">
            <AlertLatest />
          </div>
          <div className="hidden md:block">
            <AllAlerts limit={6} />
          </div>
        </div>
        <div>
          <div className="my-2 pb-1 border-b md:my-0">
            <h1 className="text-2xl py-2 capitalize md:py-0 mb-2">
              highlight reports
            </h1>
            <Link
              href={reportsFortnightly?.pdf_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-full flex flex-col justify-center h-52 border rounded-xl">
                <Image
                  src={apacLogo}
                  alt="apceLogo"
                  width={150}
                  className="w-auto"
                />
              </div>
              <h3 className="text-xl capitalize">
                {reportsFortnightly?.title}
              </h3>
              <h4 className="text-sm">
                {reportsFortnightly?.place},
                {" " +
                  formatDistanceToNow(
                    new Date(reportsFortnightly?.created_at || "")
                  )}{" "}
                ago
              </h4>
            </Link>
          </div>
          <div className="my-2 pb-1 border-b">
            <Link
              href={reportsSemiMonthly?.pdf_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-full flex flex-col justify-center h-52 border rounded-xl">
                <Image
                  src={apacLogo}
                  alt="apceLogo"
                  width={150}
                  className="w-auto"
                />
              </div>
              <h3 className="text-xl capitalize">
                {reportsSemiMonthly?.title}
              </h3>
              <h4 className="text-sm">
                {reportsSemiMonthly?.place},
                {" " +
                  formatDistanceToNow(
                    new Date(reportsSemiMonthly?.created_at || "")
                  )}{" "}
                ago
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
