"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useCallback } from "react";

export const Action = () => {
  const supabase = createClient();

  const getRandomCoordinatesInThailand = () => {
    const lat = parseFloat((Math.random() * (20 - 5) + 5).toFixed(6)); // Rough lat range for Thailand
    const long = parseFloat((Math.random() * (105 - 97) + 97).toFixed(6)); // Rough long range for Thailand
    return { lat, long };
  };

  const getRandomNews = () => {
    const descriptions = [
      {
        event_description:
          "More than 100 protesters from multiple political activist groups will demonstrate at the 14th October 1973 Memorial in Bangkok starting at 12:00 PM (local time) tomorrow.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
      },
      {
        event_description:
          "The statute of limitations for prosecuting the involved officials in the 2004 Tak Bai massacre expires today. This has raised fears of potential unrest in the deep South.",
        source: "APAC Alerts",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "A protest in Bangkok will be held to denounce political interference in the central bank and the Koh Kut island dispute with Cambodia.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
      },
      {
        event_description:
          "The ruling Pheu Thai Party will meet with coalition partners to negotiate differences on a national referendum set for February 2025.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
      },
      {
        event_description:
          "The Ministry of Interior plans to withdraw military forces from the southern provinces by 2027 and shift responsibility to local forces.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "Hundreds of activists from the ‘Network of Students’ protested in Bangkok calling for a political change.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
      },
      {
        event_description:
          "The Senate voted 164-21 to retain the double majority requirement for a constitutional referendum, delaying plans for a new charter.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
      },
      {
        event_description:
          "The Thai government has declared heightened security measures after a series of bombings injured several defense personnel in Narathiwat and Pattani.",
        source: "APAC Alerts",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "Protests in Bangkok will include the People’s Alliance for Democracy, demanding political transparency and an end to government corruption.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
      },
      {
        event_description:
          "The Thai government has extended the enforcement of the Internal Security Act in 19 districts across four provinces until September 2025.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "Security forces are on high alert in southern Thailand due to increasing tensions over territorial disputes with Cambodia.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "Thailand's Interior Minister has issued a security warning in response to rising protests and unrest in the deep South.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "The Thai Ministry of Foreign Affairs is coordinating with local authorities to manage the border dispute with Cambodia and ensure safety in the region.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "The ‘Vocational Student Group Protecting the Monarchy’ has announced a protest in front of the provincial hall in Trat to raise awareness about the Koh Kut island dispute.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Trat",
      },
      {
        event_description:
          "Thailand's Defense Ministry has been instructed to enhance security following reports of potential violent disruptions in southern provinces.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "Several civil society organizations have expressed concerns about the impact of a proposed constitutional amendment on the democratic process in Thailand.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
      },
      {
        event_description:
          "The government has promised to increase support for local communities in the southern provinces after the withdrawal of military forces by 2027.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "Reports indicate that the ruling coalition may revise policies related to public security in the wake of recent protests and incidents of violence.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
      },
      {
        event_description:
          "The government is facing mounting pressure from the opposition to revise its stance on the Koh Kut island dispute with Cambodia.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
      },
      {
        event_description:
          "The Thai Parliament will meet to discuss the proposal for a new constitutional amendment that could affect national referendum procedures.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
      },
      {
        event_description:
          "Civil society leaders are calling for the implementation of more robust environmental protection laws following widespread protests in the capital.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Bangkok",
      },
      {
        event_description:
          "A new round of protests is expected across major cities in Thailand to demand more economic support and accountability from the government.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Thailand",
      },
      {
        event_description:
          "Security forces in Pattani have been placed on alert following intelligence reports indicating possible extremist activity in the region.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Pattani",
      },
      {
        event_description:
          "A protest is scheduled in Bangkok against the ongoing violence in the southern provinces and the government's response to the situation.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
      },
      {
        event_description:
          "Thailand’s central bank has proposed measures to stabilize the economy amidst rising protests and international tensions.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
      },
    ];

    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const AILRisk = useCallback(async () => {
    const { lat, long } = getRandomCoordinatesInThailand();
    await supabase.from("alert").insert({
      even_description: getRandomNews().event_description,
      event_type: getRandomNews().event_type,
      place: getRandomNews().place,
      source: getRandomNews().source,
      risk: 4,
      lat,
      long,
    });
  }, []);

  const AIHRisk = useCallback(async () => {
    const { lat, long } = getRandomCoordinatesInThailand();
    await supabase.from("alert").insert({
      even_description: getRandomNews().event_description,
      event_type: getRandomNews().event_type,
      place: getRandomNews().place,
      source: getRandomNews().source,
      risk: 7,
      lat,
      long,
    });
  }, []);

  const RHRisk = useCallback(async () => {
    await supabase.from("alert").update({ risk: 3 }).eq("risk", 7);
  }, []);

  const Clear = useCallback(async () => {
    await supabase.from("alert").delete().neq("risk", 0);
    const { lat, long } = getRandomCoordinatesInThailand();
    await supabase.from("alert").insert({
      even_description:
        "More than 100 protesters from multiple political activist groups will demonstrate at the 14th October 1973 Memorial in Bangkok starting at 12:00 PM (local time) tomorrow. The protest aims to denounce Prime Minister Paetongtarn Shinawatra and former Prime Minister Thaksin Shinawatra.",
      event_type: "Gathering and Demonstrations",
      place: "Bangkok",
      source: "APAC Alerts",
      risk: 4,
      lat,
      long,
    });
  }, []);

  return (
    <div className="container flex flex-col gap-4 py-8">
      <Button onClick={AILRisk}>Add Incidents Low Risk</Button>
      <Button onClick={AIHRisk}>Add Incidents High Risk</Button>
      <Button onClick={RHRisk}>Reset High Risk</Button>
      <Button onClick={Clear}>Clear Default</Button>
      <Link href="/logout" className="w-full">
        <Button variant={"destructive"} className="mt-12 w-full" onClick={Clear}>
          Logout
        </Button>
      </Link>
    </div>
  );
};
