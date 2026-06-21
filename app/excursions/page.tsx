"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function ExcursionsPage() {
  const router = useRouter();
  const [excursions, setExcursions] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data, error } = await supabase
      .from("excursions")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setExcursions(data || []);
  };

  const getImage = (e: any) => {
    // only use image if valid
    if (e.image && e.image.trim() !== "") return e.image;

    // fallback if missing
    return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Экскурсии</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 15,
        }}
      >
        {excursions.map((e) => (
          <div
            key={e.id}
            onClick={() => router.push(`/excursions/${e.slug}`)}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              cursor: "pointer",
            }}
          >
            <img
              src={getImage(e)}
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
              }}
            />

            <h3>{e.title}</h3>
            <p>{e.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}