"use client";

import React, { useEffect, useState, useRef } from "react";
import * as L from "leaflet";
import "leaflet.heat";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useDvalue } from "@/providers/dvalue";

const HeatMapNoSSR: React.FC = () => {
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const { Dvalue } = useDvalue();

  const { data, isLoading, error } = useQuery({
    queryKey: ["AllAlertsMaps", Dvalue],
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

      const { data } = await query;

      return data;
    },
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setShouldRender(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    let point: [number, number] = [13.754498619763352, 100.47889378225727];
    let zoom: number = 2;
    if (Dvalue === "TH") {
      point = [13.754498619763352, 100.47889378225727];
      zoom = 5
    }
    if (Dvalue === "TL") {
      point = [-8.756776680377733, 125.89933808131748];
      zoom = 6
    }

    if (!shouldRender || leafletMapRef.current) return;

    if (mapRef.current) {
      const map = L.map(mapRef.current).setView(point, zoom);
      leafletMapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      if (data && data.length > 0) {
        const points: L.HeatLatLngTuple[] = data
          .map((p) => {
            if (p.lat && p.long) {
              // Add intensity (e.g., 0.5 as a placeholder) if you don't have an intensity value
              return [p.lat, p.long, 0.5] as L.HeatLatLngTuple;
            }
            return null;
          })
          .filter((point): point is L.HeatLatLngTuple => point !== null);

        if (points.length > 0) {
          setTimeout(() => {
            if (map.getSize().x > 0 && map.getSize().y > 0) {
              L.heatLayer(points, {
                radius: 10,
                blur: 1,
                max: 1,
                minOpacity: 0.4,
              }).addTo(map);
            } else {
              console.warn("Map size is 0, skipping heatLayer addition.");
            }
          }, 100); // Wait for 100ms to ensure DOM is ready
        }
      }
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [data, shouldRender]);

  if (!shouldRender) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>หน้าจอของคุณเล็กเกินไป กรุณาขยายหน้าจอเพื่อดูแผนที่</p>
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div ref={mapRef} id="map" style={{ height: "100%", width: "100%" }} />
  );
};

export default HeatMapNoSSR;
