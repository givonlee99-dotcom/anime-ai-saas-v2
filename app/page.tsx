"use client";

import { useState } from "react";

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);

  // HASIL IMAGE CDN
  const [animeImage, setAnimeImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [style, setStyle] = useState("Cyber");

  // =========================
  // 20 STYLES
  // =========================

  const styles = [
    "Cyber",
    "Ghibli",
    "Naruto",
    "Manga",
    "Neon",
    "Samurai",
    "Pastel",
    "Dark Anime",
    "Retro",
    "Waifu",
    "Violet",
    "Aqua",
    "Sunset",
    "Ice",
    "Tokyo Night",
    "Dreamy",
    "Pink Anime",
    "Green Neon",
    "Vintage",
    "Comic",
  ];

  // =========================
  // UPLOAD IMAGE
  // =========================

  const handleUpload = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
      setAnimeImage(null);
    };

    reader.readAsDataURL(file);
  };

  // =========================
  // GENERATE IMAGE
  // =========================

  const generateAnime = async () => {
    if (!preview) {
      alert("Upload gambar dulu");
      return;
    }

    setLoading(true);

    try {
      const img = new Image();

      img.src = preview;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setLoading(false);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        // =========================
        // FILTERS
        // =========================

        switch (style) {
          case "Cyber":
            ctx.filter =
              "contrast(130%) saturate(180%) hue-rotate(180deg)";
            break;

          case "Ghibli":
            ctx.filter =
              "brightness(115%) saturate(120%) sepia(10%)";
            break;

          case "Naruto":
            ctx.filter =
              "contrast(150%) saturate(170%) hue-rotate(-20deg)";
            break;

          case "Manga":
            ctx.filter =
              "grayscale(10%) contrast(170%)";
            break;

          case "Neon":
            ctx.filter =
              "brightness(120%) contrast(160%) saturate(200%)";
            break;

          case "Samurai":
            ctx.filter =
              "sepia(35%) contrast(135%)";
            break;

          case "Pastel":
            ctx.filter =
              "brightness(120%) saturate(90%)";
            break;

          case "Dark Anime":
            ctx.filter =
              "brightness(70%) contrast(180%)";
            break;

          case "Retro":
            ctx.filter =
              "sepia(60%) contrast(110%)";
            break;

          case "Waifu":
            ctx.filter =
              "brightness(120%) saturate(180%)";
            break;

          case "Violet":
            ctx.filter =
              "hue-rotate(260deg) saturate(170%)";
            break;

          case "Aqua":
            ctx.filter =
              "hue-rotate(180deg) brightness(120%)";
            break;

          case "Sunset":
            ctx.filter =
              "sepia(20%) saturate(180%)";
            break;

          case "Ice":
            ctx.filter =
              "brightness(125%) contrast(120%)";
            break;

          case "Tokyo Night":
            ctx.filter =
              "brightness(75%) contrast(180%) hue-rotate(210deg)";
            break;

          case "Dreamy":
            ctx.filter =
              "blur(1px) brightness(120%)";
            break;

          case "Pink Anime":
            ctx.filter =
              "hue-rotate(320deg) saturate(180%)";
            break;

          case "Green Neon":
            ctx.filter =
              "hue-rotate(90deg) contrast(160%)";
            break;

          case "Vintage":
            ctx.filter =
              "sepia(50%) contrast(95%)";
            break;

          case "Comic":
            ctx.filter =
              "contrast(180%) saturate(200%)";
            break;

          default:
            ctx.filter = "none";
        }

        ctx.drawImage(img, 0, 0);

        // =========================
        // SIMPAN KE BLOB
        // =========================

        canvas.toBlob((blob) => {
          if (!blob) {
            alert("Gagal generate");
            setLoading(false);
            return;
          }

          // URL sementara browser
          const imageUrl = URL.createObjectURL(blob);

          setAnimeImage(imageUrl);

          setLoading(false);
        }, "image/jpeg", 1);
      };
    } catch (err) {
      console.log(err);

      alert("Terjadi kesalahan");

      setLoading(false);
    }
  };

  // =========================
  // DOWNLOAD FIX ANDROID
  // =========================

  const downloadImage = () => {
    if (!animeImage) {
      alert("Generate gambar dulu");
      return;
    }

    const link = document.createElement("a");

    link.href = animeImage;

    link.download = `anime-${style}.jpg`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-cyan-500/20 blur-[180px] rounded-full"></div>

      <section className="relative z-10 px-5 py-12">

        {/* TITLE */}
        <div className="text-center mb-10">
          <div className="inline-block px-6 py-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm tracking-widest uppercase mb-6">
            AI Anime Generator
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Turn Photo Into
            <br />
            <span className="text-cyan-400">
              Anime Art
            </span>
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Upload your image and transform it into stunning anime styles.
          </p>
        </div>

        {/* STYLES */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-10 no-scrollbar">

          {styles.map((item) => (
            <button
              key={item}
              onClick={() => setStyle(item)}
              className={`px-5 py-3 rounded-2xl whitespace-nowrap transition-all ${
                style === item
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold"
                  : "bg-white/10 text-white"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">

          {/* LEFT */}
          <div className="rounded-[35px] border border-cyan-400/20 bg-white/5 backdrop-blur-xl p-5">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-4xl md:text-5xl font-black">
                Upload Gambar
              </h2>

              <div className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                AI Ready
              </div>

            </div>

            <label className="border-2 border-dashed border-cyan-400/30 rounded-[30px] min-h-[500px] flex items-center justify-center overflow-hidden cursor-pointer p-4">

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />

              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="rounded-[25px] w-full object-cover max-h-[620px]"
                />
              ) : (
                <div className="text-center">

                  <div className="text-7xl mb-5">
                    📸
                  </div>

                  <p className="text-2xl font-bold">
                    Upload Gambar
                  </p>

                  <p className="text-gray-500 mt-3">
                    PNG, JPG, WEBP supported
                  </p>

                </div>
              )}

            </label>

            <button
              onClick={generateAnime}
              disabled={loading}
              className="w-full mt-6 py-5 rounded-[25px] bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-2xl font-black hover:scale-[1.02] transition-all"
            >
              {loading ? "Generating..." : "Generate Anime"}
            </button>

          </div>

          {/* RIGHT */}
          <div className="rounded-[35px] border border-cyan-400/20 bg-white/5 backdrop-blur-xl p-5">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-4xl md:text-5xl font-black">
                Hasil Gambar
              </h2>

              <div className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                Ultra HD
              </div>

            </div>

            <div className="bg-black rounded-[30px] min-h-[500px] overflow-hidden flex items-center justify-center">

              {loading ? (
                <div className="flex flex-col items-center">

                  <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

                  <p className="mt-5 text-xl">
                    Generating Anime...
                  </p>

                </div>
              ) : animeImage ? (
                <img
                  src={animeImage}
                  alt="anime"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">

                  <div className="text-6xl mb-4">
                    ✨
                  </div>

                  <p className="text-gray-500">
                    Hasil gambar muncul di sini
                  </p>

                </div>
              )}

            </div>

            {/* DOWNLOAD */}
            <button
              onClick={downloadImage}
              className="w-full mt-6 py-5 rounded-[25px] bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-2xl md:text-3xl font-black hover:scale-[1.02] transition-all"
            >
              ⬇ Download Result
            </button>

          </div>

        </div>
      </section>

      {/* HIDE SCROLLBAR */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </main>
  );
}
