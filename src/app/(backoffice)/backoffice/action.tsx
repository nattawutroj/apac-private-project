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

  const getRandomCoordinatesInTimorLeste = () => {
    const lat = parseFloat((Math.random() * (-8 - -9.5) + -9.5).toFixed(6)); // Lat range for Timor-Leste
    const long = parseFloat((Math.random() * (127 - 124) + 124).toFixed(6)); // Long range for Timor-Leste
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
        area: "TH",
      },
      {
        event_description:
          "The statute of limitations for prosecuting the involved officials in the 2004 Tak Bai massacre expires today. This has raised fears of potential unrest in the deep South.",
        source: "APAC Alerts",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "A protest in Bangkok will be held to denounce political interference in the central bank and the Koh Kut island dispute with Cambodia.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
        area: "TH",
      },
      {
        event_description:
          "The ruling Pheu Thai Party will meet with coalition partners to negotiate differences on a national referendum set for February 2025.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "The Ministry of Interior plans to withdraw military forces from the southern provinces by 2027 and shift responsibility to local forces.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "Hundreds of activists from the ‘Network of Students’ protested in Bangkok calling for a political change.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
        area: "TH",
      },
      {
        event_description:
          "The Senate voted 164-21 to retain the double majority requirement for a constitutional referendum, delaying plans for a new charter.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "The Thai government has declared heightened security measures after a series of bombings injured several defense personnel in Narathiwat and Pattani.",
        source: "APAC Alerts",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "Protests in Bangkok will include the People’s Alliance for Democracy, demanding political transparency and an end to government corruption.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
        area: "TH",
      },
      {
        event_description:
          "The Thai government has extended the enforcement of the Internal Security Act in 19 districts across four provinces until September 2025.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "Security forces are on high alert in southern Thailand due to increasing tensions over territorial disputes with Cambodia.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "Thailand's Interior Minister has issued a security warning in response to rising protests and unrest in the deep South.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "The Thai Ministry of Foreign Affairs is coordinating with local authorities to manage the border dispute with Cambodia and ensure safety in the region.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "The ‘Vocational Student Group Protecting the Monarchy’ has announced a protest in front of the provincial hall in Trat to raise awareness about the Koh Kut island dispute.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Trat",
        area: "TH",
      },
      {
        event_description:
          "Thailand's Defense Ministry has been instructed to enhance security following reports of potential violent disruptions in southern provinces.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "Several civil society organizations have expressed concerns about the impact of a proposed constitutional amendment on the democratic process in Thailand.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "The government has promised to increase support for local communities in the southern provinces after the withdrawal of military forces by 2027.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "Reports indicate that the ruling coalition may revise policies related to public security in the wake of recent protests and incidents of violence.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "The government is facing mounting pressure from the opposition to revise its stance on the Koh Kut island dispute with Cambodia.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
        area: "TH",
      },
      {
        event_description:
          "The Thai Parliament will meet to discuss the proposal for a new constitutional amendment that could affect national referendum procedures.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "Civil society leaders are calling for the implementation of more robust environmental protection laws following widespread protests in the capital.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Bangkok",
        area: "TH",
      },
      {
        event_description:
          "A new round of protests is expected across major cities in Thailand to demand more economic support and accountability from the government.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Thailand",
        area: "TH",
      },
      {
        event_description:
          "Security forces in Pattani have been placed on alert following intelligence reports indicating possible extremist activity in the region.",
        source: "Southeast Asia Updates",
        event_type: "Security Announcements",
        place: "Pattani",
        area: "TH",
      },
      {
        event_description:
          "A protest is scheduled in Bangkok against the ongoing violence in the southern provinces and the government's response to the situation.",
        source: "APAC Alerts",
        event_type: "Gathering and Demonstrations",
        place: "Bangkok",
        area: "TH",
      },
      {
        event_description:
          "Thailand’s central bank has proposed measures to stabilize the economy amidst rising protests and international tensions.",
        source: "Southeast Asia Updates",
        event_type: "New Laws",
        place: "Thailand",
        area: "TH",
      },
    ];

    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const getRandomNewsTL = () => {
    const descriptions = [
      {
        event_description:
          "The government of Timor-Leste has announced a nationwide vaccination campaign to combat a rising dengue outbreak.",
        source: "Timor Health Updates",
        event_type: "Health Announcements",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "Heavy rains are expected to cause flooding in several districts of Timor-Leste over the next three days.",
        source: "Timor Weather Alerts",
        event_type: "Weather Updates",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "Thousands of citizens gathered in Dili to demand reforms in education and healthcare sectors.",
        source: "Timor News Network",
        event_type: "Gathering and Demonstrations",
        place: "Dili",
        area: "TL",
      },
      {
        event_description:
          "The government has extended its agricultural subsidy program to support local farmers affected by drought conditions.",
        source: "Timor Agriculture Updates",
        event_type: "Government Announcements",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "Timor-Leste's Ministry of Energy has signed a new agreement to explore renewable energy projects across the country.",
        source: "Energy Updates Timor",
        event_type: "Energy Announcements",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "The National Police of Timor-Leste has increased security in Dili following reports of planned demonstrations over labor rights.",
        source: "Timor Security Alerts",
        event_type: "Security Announcements",
        place: "Dili",
        area: "TL",
      },
      {
        event_description:
          "A new law to regulate fisheries and promote sustainable practices has been introduced in the parliament of Timor-Leste.",
        source: "Timor Legal Updates",
        event_type: "New Laws",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "The Ministry of Tourism has launched a campaign to promote Timor-Leste as an eco-tourism destination.",
        source: "Timor Tourism Updates",
        event_type: "Tourism Announcements",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "Timor-Leste is set to host a regional economic forum next month to strengthen trade ties with neighboring countries.",
        source: "Regional News Timor",
        event_type: "Economic Announcements",
        place: "Dili",
        area: "TL",
      },
      {
        event_description:
          "Local communities in rural Timor-Leste are set to benefit from a new water supply project funded by international donors.",
        source: "Timor Development News",
        event_type: "Development Announcements",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "The President of Timor-Leste has urged citizens to participate in upcoming consultations on the country's economic strategy for 2025.",
        source: "Timor Presidential Updates",
        event_type: "Political Announcements",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "Security forces in Timor-Leste have been placed on alert following intelligence reports of potential unrest in key urban areas.",
        source: "Timor Security Alerts",
        event_type: "Security Announcements",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "A public protest is planned in Dili to raise awareness about environmental degradation caused by deforestation.",
        source: "Environmental Updates Timor",
        event_type: "Gathering and Demonstrations",
        place: "Dili",
        area: "TL",
      },
      {
        event_description:
          "The Timor-Leste government is in talks with international organizations to improve access to education in remote areas.",
        source: "Education Updates Timor",
        event_type: "Development Announcements",
        place: "Timor-Leste",
        area: "TL",
      },
      {
        event_description:
          "Timor-Leste's parliament has approved a new budget focused on infrastructure and healthcare development.",
        source: "Timor Budget News",
        event_type: "Government Announcements",
        place: "Timor-Leste",
        area: "TL",
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
      area: getRandomNews().area,
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
      area: getRandomNews().area,
      source: getRandomNews().source,
      risk: 7,
      lat,
      long,
    });
  }, []);

  const TLAILRisk = useCallback(async () => {
    const { lat, long } = getRandomCoordinatesInTimorLeste();
    await supabase.from("alert").insert({
      even_description: getRandomNewsTL().event_description,
      event_type: getRandomNewsTL().event_type,
      place: getRandomNewsTL().place,
      area: getRandomNewsTL().area,
      source: getRandomNewsTL().source,
      risk: 4,
      lat,
      long,
    });
  }, []);

  const TLAIHRisk = useCallback(async () => {
    const { lat, long } = getRandomCoordinatesInTimorLeste();
    await supabase.from("alert").insert({
      even_description: getRandomNewsTL().event_description,
      event_type: getRandomNewsTL().event_type,
      place: getRandomNewsTL().place,
      area: getRandomNewsTL().area,
      source: getRandomNewsTL().source,
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
    const { lat: latTL, long: longTL } = getRandomCoordinatesInTimorLeste();
    await supabase.from("alert").insert({
      even_description:
        "More than 100 protesters from multiple political activist groups will demonstrate at the 14th October 1973 Memorial in Bangkok starting at 12:00 PM (local time) tomorrow. The protest aims to denounce Prime Minister Paetongtarn Shinawatra and former Prime Minister Thaksin Shinawatra.",
      event_type: "Gathering and Demonstrations",
      place: "Bangkok",
      area: "TH",
      source: "APAC Alerts",
      risk: 4,
      lat,
      long,
    });
    await supabase.from("alert").insert({
      even_description:
        "Thousands of citizens gathered in Dili to demand reforms in education and healthcare sectors.",
      event_type: "Gathering and Demonstrations",
      place: "Dili",
      area: "TL",
      source: "Timor News Network",
      risk: 4,
      lat: latTL,
      long: longTL,
    });
  }, []);

  return (
    <div className="container flex flex-col gap-4 py-8">
      <Button onClick={AILRisk}>Add Incidents Low Risk Thailand</Button>
      <Button onClick={AIHRisk}>Add Incidents High Risk Thailand</Button>
      <Button onClick={TLAILRisk}>Add Incidents Low Risk Timor Leste</Button>
      <Button onClick={TLAIHRisk}>Add Incidents High Risk Timor Leste</Button>
      <Button onClick={RHRisk}>Reset High Risk</Button>
      <Button onClick={Clear}>Clear Default</Button>
      <Link href="/logout" className="w-full">
        <Button
          variant={"destructive"}
          className="mt-12 w-full"
          onClick={Clear}
        >
          Logout
        </Button>
      </Link>
    </div>
  );
};
