"use client";

import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const menu = [
    { name: "📊 Дашборд", path: "/admin" },
    { name: "🏝 Экскурсии", path: "/admin" },
    { name: "📦 Бронирования", path: "/admin/bookings" },
  ];

  const logout = () => {
    document.cookie = "jamal_user=; path=/; max-age=0";
    router.push("/auth/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      
      {/* SIDEBAR */}
      <div
        style={{
          width: 220,
          background: "#111",
          color: "white",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h2>Jamal Admin</h2>

        {menu.map((item) => (
          <button
            key={item.name}   // ✅ FIX: unique key (NOT path)
            onClick={() => router.push(item.path)}
            style={{
              padding: 10,
              background: "transparent",
              color: "white",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {item.name}
          </button>
        ))}

        <hr style={{ opacity: 0.3 }} />

        <button onClick={logout} style={{ color: "red", marginTop: "auto" }}>
          🚪 Выйти
        </button>
      </div>

      <div style={{ flex: 1, padding: 30 }}>{children}</div>
    </div>
  );
}