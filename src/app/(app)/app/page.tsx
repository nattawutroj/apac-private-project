import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import apacLogo from "@/assets/apac-logo.png";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Alerts } from "./elements/alerts";
import { AlertLatest } from "./elements/alertLatest";

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
      <div className="my-4">
        <h1 className="text-2xl capitalize">latest incidents</h1>
        <AlertLatest />
        <div className="my-2 pb-1 border-b">
          <h1 className="text-2xl py-2 capitalize">reports</h1>
          <Link
            href={reportsFortnightly?.pdf_url || "#"}
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
            <h3 className="text-xl capitalize">{reportsFortnightly?.title}</h3>
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
            <div className="w-full flex flex-col justify-center h-52 border">
              <Image
                src={apacLogo}
                alt="apceLogo"
                width={150}
                className="w-auto"
              />
            </div>
            <h3 className="text-xl capitalize">{reportsSemiMonthly?.title}</h3>
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
  );
}
