"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const HeatMapNoSSR = dynamic(() => import("./HeatMapNoSSR"), { ssr: false });

export default function Map() {
  return <HeatMapNoSSR />;
}
