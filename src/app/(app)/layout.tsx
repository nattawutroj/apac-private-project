/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import apacLogo from "@/assets/apac-logo.png";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/utils/supabase/subscribing";
import { useQueryClient } from "@tanstack/react-query";
import { HomeIcon, MegaphoneIcon, ShieldAlertIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "alert",
        },
        (payload: any) => {
          queryClient.invalidateQueries({ queryKey: ["highRiskAlert"] });
          queryClient.invalidateQueries({ queryKey: ["latestAlert"] });
          if (payload) {
            toast({
              variant: "destructive",
              title: payload.new.event_type,
              description: payload.new.even_description,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="sticky top-0 z-40 h-16 w-full bg-white shadow">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <Image
            src={apacLogo}
            alt="apceLogo"
            width={150}
            className="h-3/5 w-auto"
          />
        </div>
      </div>
      <div className="flex-grow mb-16">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
      <div className="fixed -bottom-1 z-40 h-16 w-full bg-white shadow">
        <div className="container mx-auto flex h-full items-center justify-around px-4">
          <Link href="/app">
            <div
              className={`p-2 rounded-full ${
                pathname === "/app" ? "bg-gray-200/70" : "bg-transparent"
              }`}
            >
              <HomeIcon
                className={pathname === "/app" ? "text-black" : "text-gray-500"}
              />
            </div>
          </Link>
          <Link href="/app/incidents">
            <div
              className={`p-2 rounded-full ${
                pathname === "/app/incidents" ? "bg-gray-200/70" : "bg-transparent"
              }`}
            >
              <ShieldAlertIcon
                className={
                  pathname === "/app/incidents" ? "text-black" : "text-gray-500"
                }
              />
            </div>
          </Link>
          <Link href="/app/reports">
            <div
              className={`p-2 rounded-full ${
                pathname === "/app/reports" ? "bg-gray-200/70" : "bg-transparent"
              }`}
            >
              <MegaphoneIcon
                className={
                  pathname === "/app/reports" ? "text-black" : "text-gray-500"
                }
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
