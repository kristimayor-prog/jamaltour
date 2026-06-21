"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function ExcursionPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;

  const router = useRouter();

  const [excursion, setExcursion] = useState<any>(null);

  const [name, setName] = useState("");
  const [pax, setPax] = useState("");
  const [hotel, setHotel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [touristWhatsapp, setTouristWhatsapp] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    loadExcursion();
  }, [slug]);

  const loadExcursion = async () => {
    const { data, error } = await supabase
      .from("excursions")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Supabase error:", error);
    }

    setExcursion(data);
  };

  const submitBooking = async () => {
    if (!excursion) return;

    if (!name || !pax || !hotel || !date || !time) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    setLoading(true);

    const booking = {
      excursion_title: excursion.title,
      name,
      pax,
      hotel,
      date,
      time,
      tourist_whatsapp: touristWhatsapp,
    };

    const { error } = await supabase.from("bookings").insert([booking]);

    setLoading(false);

    if (!error) {
      setName("");
      setPax("");
      setHotel("");
      setDate("");
      setTime("");
      setTouristWhatsapp("");

      router.push(
        `/booking/success?name=${encodeURIComponent(name)}&date=${date}&time=${time}`
      );
    } else {
      alert("Ошибка при бронировании");
    }
  };

  if (!excursion) return <div style={{ padding: 30 }}>Загрузка...</div>;

  const gallery: string[] =
    typeof excursion.gallery === "string"
      ? excursion.gallery
          .split(",")
          .map((g: string) => g.trim())
          .filter(Boolean)
      : Array.isArray(excursion.gallery)
      ? excursion.gallery
      : [];

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      
      {excursion.image && (
        <img
          src={excursion.image}
          style={{
            width: "100%",
            height: 350,
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
      )}

      <h1 style={{ marginTop: 20 }}>{excursion.title}</h1>
      <h2>{excursion.price}</h2>

      <p style={{ marginTop: 10 }}>{excursion.description}</p>

      <hr />

      {/* NEW FIELDS */}
      {excursion.duration && (
        <p><b>🕒 Длительность:</b> {excursion.duration}</p>
      )}

      {excursion.pickup_time && (
        <p><b>🚐 Время трансфера:</b> {excursion.pickup_time}</p>
      )}

      {excursion.includes && (
        <p><b>✅ Включено:</b> {excursion.includes}</p>
      )}

      {excursion.not_includes && (
        <p><b>❌ Не включено:</b> {excursion.not_includes}</p>
      )}

      {excursion.bring_with_you && (
        <p><b>🎒 Что взять с собой:</b> {excursion.bring_with_you}</p>
      )}

      <hr />

      {/* GALLERY */}
      {gallery.length > 0 && (
        <>
          <h3>🖼 Галерея</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 10,
            }}
          >
            {gallery.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                style={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            ))}
          </div>
          <hr />
        </>
      )}

      {/* BOOKING */}
      <h2>Бронирование экскурсии</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
        
        <input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Количество участников" value={pax} onChange={(e) => setPax(e.target.value)} />
        <input placeholder="Отель и номер комнаты" value={hotel} onChange={(e) => setHotel(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input placeholder="Время (HH:MM)" value={time} onChange={(e) => setTime(e.target.value)} />
        <input placeholder="WhatsApp" value={touristWhatsapp} onChange={(e) => setTouristWhatsapp(e.target.value)} />

        <button
          onClick={submitBooking}
          disabled={loading}
          style={{
            background: "black",
            color: "white",
            padding: 10,
            cursor: "pointer",
          }}
        >
          {loading ? "Отправка..." : "Забронировать"}
        </button>
      </div>
    </div>
  );
}