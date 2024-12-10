import apacLogo from "@/assets/apac-logo.png";
import { HomeIcon, MegaphoneIcon, ShieldAlertIcon } from "lucide-react";
import Image from "next/image";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
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
      <div>{children}</div>
      <div className="fixed bottom-0 z-40 h-16 w-full bg-white shadow">
        <div className="container mx-auto flex h-full items-center justify-around px-4">
          <HomeIcon />
          <ShieldAlertIcon />
          <MegaphoneIcon />
        </div>
      </div>
    </div>
  );
}
