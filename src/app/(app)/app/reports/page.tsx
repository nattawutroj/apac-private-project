import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import apacLogo from "@/assets/apac-logo.png";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function AppPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container mt-2">
      <h1 className="text-2xl py-2 capitalize">all reports</h1>
      {data?.map((a, k) => {
        return (
          <div key={k} className="my-3 pb-3 border-b">
            <Link
              href={a?.pdf_url || "#"}
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
              <h3 className="text-xl capitalize">{a?.title}</h3>
              <h4 className="text-sm">
                {a?.place},
                {" " + formatDistanceToNow(new Date(a?.created_at || ""))} ago
              </h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
