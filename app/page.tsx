"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function HomePage() {
  const router = useRouter();
  const [excursions, setExcursions] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase
      .from("excursions")
      .select("*")
      .order("id", { ascending: false })
      .limit(6);

    setExcursions(data || []);
  };

  const getImage = (e: any) => {
    if (e.image && e.image.trim()) return e.image;

    if (e.gallery && typeof e.gallery === "string") {
      const first = e.gallery
        .split(",")
        .map((x: string) => x.trim())
        .find(Boolean);

      if (first) return first;
    }

    return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      {/* HERO */}
      <div
        style={{
          height: 360,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: 40, margin: 0 }}>Jamal Tour</h1>
        <p style={{ marginTop: 10 }}>
          Лучшие экскурсии в Турции, Египте и Грузии
        </p>

        <button
          onClick={() => router.push("/excursions")}
          style={{
            marginTop: 20,
            padding: "10px 18px",
            background: "white",
            color: "#111",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Смотреть экскурсии
        </button>
      </div>

      {/* EXCURSIONS */}
      <div style={{ padding: 30, maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ color: "white" }}>Популярные экскурсии</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 18,
            marginTop: 20,
          }}
        >
          {excursions.map((e) => (
            <div
              key={e.id}
              onClick={() => router.push(`/excursions/${e.slug}`)}
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                background: "rgba(0,0,0,0.3)",
                color: "white",
              }}
            >
              <img
                src={getImage(e)}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div style={{ padding: 10 }}>
                <h3 style={{ margin: 0, fontSize: 16 }}>{e.title}</h3>
                <p style={{ margin: 0, fontWeight: 600 }}>{e.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}