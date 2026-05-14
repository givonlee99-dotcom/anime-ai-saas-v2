"use client";

import { useEffect, useState } from "react";

export default function DownloadPage() {
  const [status, setStatus] = useState("Menyiapkan download...");

  useEffect(() => {
    try {
      const image = sessionStorage.getItem("animeResult");

      if (!image) {
        setStatus("Gambar tidak ditemukan.");
        return;
      }

      const link = document.createElement("a");
      link.href = image;
      link.download = `anime-${Date.now()}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus("Download dimulai...");
    } catch (err) {
      setStatus("Gagal download.");
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-3xl border border-cyan-500/30 bg-white/5 backdrop-blur-xl p-10 text-center">
        <h1 className="text-4xl font-black mb-4">Download Anime</h1>

        <p className="text-zinc-300 text-lg">{status}</p>

        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold hover:scale-105 transition"
          >
            ← Kembali
          </a>
        </div>
      </div>
    </main>
  );
}
