"use client";

import Globe from "@/components/ui/globe";
import { LoginCard } from "./elements/loginCard";

export default function Auth() {
  return (
    <div className="relative">
      <div className="absolute z-0 h-screen w-screen overscroll-none overflow-hidden bg-white/30 ">
        <Globe className="md:my-auto top-3/4 md:top-0" />
      </div>
      <div className="absolute z-10 h-screen w-screen overscroll-none flex items-center justify-center">
        <LoginCard />
      </div>
    </div>
  );
}
