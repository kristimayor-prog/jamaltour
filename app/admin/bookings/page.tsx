"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    setBookings(data || []);
    setLoading(false);
  };

  const deleteBooking = async (id: number) => {
    const confirm = window.confirm("Удалить бронирование?");
    if (!confirm) return;

    await supabase.from("bookings").delete().eq("id", id);
    loadBookings();
  };

  const formatWhatsApp = (num: string) => {
    if (!num) return "";
    return num.replace(/\D/g, "");
  };

  if (loading) {
    return <div style={{ padding: 30 }}>Загрузка...</div>;
  }

  return (
    <div>
      <h1>📦 Бронирования</h1>

      <p style={{ color: "#666" }}>
        Управление заявками клиентов
      </p>

      <div style={{ marginTop: 20, overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 900,
          }}
        >
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
              <th>Экскурсия</th>
              <th>Имя</th>
              <th>Участники</th>
              <th>Отель</th>
              <th>Дата</th>
              <th>Время</th>
              <th>WhatsApp</th>
              <th>Действия</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                
                <td>{b.excursion_title}</td>
                <td>{b.name}</td>
                <td>{b.pax}</td>
                <td>{b.hotel}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>

                <td>
                  {b.tourist_whatsapp && (
                    <a
                      href={`https://wa.me/${formatWhatsApp(
                        b.tourist_whatsapp
                      )}`}
                      target="_blank"
                      style={{ color: "green" }}
                    >
                      Написать
                    </a>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => deleteBooking(b.id)}
                    style={{ color: "red" }}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}