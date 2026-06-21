"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function AdminPage() {
  const [excursions, setExcursions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [duration, setDuration] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [includes, setIncludes] = useState("");
  const [notIncludes, setNotIncludes] = useState("");
  const [bringWithYou, setBringWithYou] = useState("");

  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase
      .from("excursions")
      .select("*")
      .order("id", { ascending: false });

    setExcursions(data || []);
  };

  const upload = async (file: File) => {
    const name = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("excursions")
      .upload(name, file);

    if (error) return "";

    const { data } = supabase.storage
      .from("excursions")
      .getPublicUrl(name);

    return data.publicUrl;
  };

  const handleUploadMultiple = async (files: FileList | null) => {
    if (!files) return;

    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const url = await upload(file);
      if (url) uploaded.push(url);
    }

    setGallery((prev) => [...prev, ...uploaded]);
  };

  const removeImage = (url: string) => {
    setGallery((prev) => prev.filter((img) => img !== url));
  };

  const reset = () => {
    setEditingId(null);
    setTitle("");
    setPrice("");
    setDescription("");
    setWhatsapp("");
    setDuration("");
    setPickupTime("");
    setIncludes("");
    setNotIncludes("");
    setBringWithYou("");
    setGallery([]);
  };

  const save = async () => {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const payload = {
      title,
      price,
      description,
      whatsapp,
      duration,
      pickup_time: pickupTime,
      includes,
      not_includes: notIncludes,
      bring_with_you: bringWithYou,
      gallery: gallery.join(","),
      slug,
    };

    if (editingId) {
      await supabase.from("excursions").update(payload).eq("id", editingId);
    } else {
      await supabase.from("excursions").insert([payload]);
    }

    reset();
    load();
  };

  const editItem = (e: any) => {
    setEditingId(e.id);

    setTitle(e.title || "");
    setPrice(e.price || "");
    setDescription(e.description || "");
    setWhatsapp(e.whatsapp || "");

    setDuration(e.duration || "");
    setPickupTime(e.pickup_time || "");
    setIncludes(e.includes || "");
    setNotIncludes(e.not_includes || "");
    setBringWithYou(e.bring_with_you || "");

    setGallery(
      e.gallery ? e.gallery.split(",").filter(Boolean) : []
    );
  };

  const deleteItem = async (id: number) => {
    await supabase.from("excursions").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <h1>🏝 Экскursions CMS</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 500 }}>
        <input placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} />
        <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input placeholder="WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />

        <input placeholder="Продолжительность" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <input placeholder="Время трансфера" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />

        <textarea placeholder="Что включено" value={includes} onChange={(e) => setIncludes(e.target.value)} />
        <textarea placeholder="Что не включено" value={notIncludes} onChange={(e) => setNotIncludes(e.target.value)} />
        <textarea placeholder="Что взять с собой" value={bringWithYou} onChange={(e) => setBringWithYou(e.target.value)} />

        {/* MULTI IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleUploadMultiple(e.target.files)}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          {gallery.map((img) => (
            <div key={img} style={{ position: "relative" }}>
              <img src={img} style={{ width: 80, height: 60, objectFit: "cover" }} />
              <button
                onClick={() => removeImage(img)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button onClick={save}>
          {editingId ? "Обновить экскурсию" : "Добавить экскурсию"}
        </button>

        {editingId && (
          <button onClick={reset} style={{ background: "#ccc" }}>
            Отмена
          </button>
        )}
      </div>

      <hr />

      <h2>Список</h2>

      {excursions.map((e) => (
        <div key={e.id} style={{ marginBottom: 10 }}>
          <b>{e.title}</b> — {e.price}

          <button onClick={() => editItem(e)} style={{ marginLeft: 10 }}>
            Редактировать
          </button>

          <button onClick={() => deleteItem(e.id)} style={{ marginLeft: 10, color: "red" }}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}