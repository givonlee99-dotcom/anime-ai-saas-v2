"use client";

import { useState } from "react";

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  const [animeImage, setAnimeImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [style, setStyle] = useState("Cyber");

  // =========================
  // STYLE LIST
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
  // GENERATE ANIME
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

        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        // =========================
        // FILTER STYLE
        // =========================

        switch (style) {
          case "Cyber":
            ctx.filter = "contrast(130%) saturate(180%) hue-rotate(180deg)";
            break;

          case "Ghibli":
            ctx.filter = "brightness(115%) saturate(120%) sepia(10%)";
            break;

          case "Naruto":
            ctx.filter = "contrast(150%) saturate(170%) hue-rotate(-20deg)";
            break;

          case "Manga":
            ctx.filter = "grayscale(10%) contrast(170%)";
            break;

          case "Neon":
            ctx.filter = "brightness(120%) contrast(160%) saturate(200%)";
            break;

          case "Samurai":
            ctx.filter = "sepia(35%) contrast(135%)";
            break;

          case "Pastel":
            ctx.filter = "brightness(120%) saturate(90%)";
            break;

          case "Dark Anime":
            ctx.filter = "brightness(70%) contrast(180%)";
            break;

          case "Retro":
            ctx.filter = "sepia(60%) contrast(110%)";
            break;

          case "Waifu":
            ctx.filter = "brightness(120%) saturate(180%)";
            break;

          case "Violet":
            ctx.filter = "hue-rotate(260deg) saturate(170%)";
            break;

          case "Aqua":
            ctx.filter = "hue-rotate(180deg) brightness(120%)";
            break;

          case "Sunset":
            ctx.filter = "sepia(20%) saturate(180%)";
            break;

          case "Ice":
            ctx.filter = "brightness(125%) contrast(120%)";
            break;

          case "Tokyo Night":
            ctx.filter = "brightness(75%) contrast(180%) hue-rotate(210deg)";
            break;

          case "Dreamy":
            ctx.filter = "blur(1px) brightness(120%)";
            break;

          case "Pink Anime":
            ctx.filter = "hue-rotate(320deg) saturate(180%)";
            break;

          case "Green Neon":
            ctx.filter = "hue-rotate(90deg) contrast(160%)";
            break;

          case "Vintage":
            ctx.filter = "sepia(50%) contrast(95%)";
            break;

          case "Comic":
            ctx.filter = "contrast(180%) saturate(200%)";
            break;

          default:
            ctx.filter = "none";
        }

        // DRAW IMAGE
        ctx.drawImage(img, 0, 0);

        // =========================
        // COMPRESS IMAGE
        // =========================

        const finalImage = canvas.toDataURL("image/jpeg", 0.92);

        // =========================
        // SAVE RESULT
        // =========================

        sessionStorage.setItem("animeResult", finalImage);

        setAnimeImage(finalImage);

        setLoading(false);
      };
    } catch (err) {
      console.log(err);

      alert("Terjadi kesalahan");

      setLoading(false);
    }
  };

  // =========================
  // DIRECT DOWNLOAD
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
    <main className="min-h-screen bg-black overflow-hidden relative">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-cyan-500/20 blur-[180px] rounded-full"></div>

      {/* HERO */}
      <section className="relative z-10 pt-20 pb-10 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          {/* BADGE */}
          <div className="inline-block px-6 py-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm tracking-widest uppercase mb-6">
            AI Anime Generator
          </div>

          {/* TITLE */}
          <h1 className="text-white text-6xl md:text-8xl font-black leading-tight">
            Turn Your Photo
            <br />
            Into <span className="text-cyan-400">Anime Art</span>
          </h1>

          {/* DESC */}
          <p className="text-gray-400 text-xl md:text-2xl mt-8 max-w-3xl mx-auto leading-relaxed">
            Upload your image and transform it into stunning anime, manga,
            cyberpunk, ghibli, waifu and cinematic styles.
          </p>

          {/* STATS */}
          <div className="flex flex-wrap justify-center gap-5 mt-10">
            <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white">
              ⚡ Fast AI Render
            </div>

            <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white">
              🎨 20 Anime Styles
            </div>

            <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white">
              🚀 Unlimited Generate
            </div>

            <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white">
              💎 Ultra HD Export
            </div>
          </div>
        </div>
      </section>

      {/* STYLE */}
      <section className="relative z-10 px-6 mt-10">
        <div className="max-w-7xl mx-auto relative">
          {/* LEFT */}
          <button
            onClick={() => {
              const container = document.getElementById("style-scroll");

              if (container) {
                container.scrollBy({
                  left: -300,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/70 border border-cyan-400/30 text-white text-2xl backdrop-blur-xl hover:bg-cyan-500 hover:text-black transition-all"
          >
            ←
          </button>

          {/* RIGHT */}
          <button
            onClick={() => {
              const container = document.getElementById("style-scroll");

              if (container) {
                container.scrollBy({
                  left: 300,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/70 border border-cyan-400/30 text-white text-2xl backdrop-blur-xl hover:bg-cyan-500 hover:text-black transition-all"
          >
            →
          </button>

          {/* SCROLL */}
          <div
            id="style-scroll"
            className="overflow-x-auto no-scrollbar scroll-smooth px-20"
          >
            <div className="flex gap-4 min-w-max">
              {styles.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setStyle(item);

                    if (preview) {
                      setTimeout(() => {
                        generateAnime();
                      }, 100);
                    }
                  }}
                  className={`px-7 py-4 rounded-2xl border transition-all duration-300 whitespace-nowrap ${
                    style === item
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-transparent shadow-[0_0_30px_rgba(0,255,255,0.4)] font-bold"
                      : "bg-white/5 border-cyan-400/20 text-white hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 justify-center">
          {/* LEFT */}
          <div className="w-full max-w-[620px] rounded-[35px] border border-cyan-400/20 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-6xl font-black leading-none">
                Upload
                <br />
                Image
              </h2>

              <div className="px-5 py-3 rounded-full bg-cyan-500/20 text-cyan-300">
                AI Ready
              </div>
            </div>

            <label className="border-2 border-dashed border-cyan-400/30 rounded-[30px] min-h-[650px] flex items-center justify-center overflow-hidden cursor-pointer p-5">
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
                  <div className="text-7xl mb-5">📸</div>

                  <p className="text-white text-3xl font-bold">
                    Upload your image
                  </p>

                  <p className="text-gray-500 mt-3">PNG, JPG, WEBP supported</p>
                </div>
              )}
            </label>

            {/* BUTTON */}
            <button
              onClick={generateAnime}
              disabled={loading}
              className="w-full mt-6 py-6 rounded-[25px] bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-3xl font-black hover:scale-[1.02] transition-all"
            >
              {loading ? "Generating..." : "Generate Anime"}
            </button>
          </div>

          {/* RIGHT */}
          <div className="w-full max-w-[620px] rounded-[35px] border border-cyan-400/20 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-6xl font-black">AI Result</h2>

              <div className="px-5 py-3 rounded-full bg-purple-500/20 text-purple-300">
                Ultra HD
              </div>
            </div>

            <div className="bg-black rounded-[30px] min-h-[650px] overflow-hidden flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 border-[6px] border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

                  <p className="text-cyan-300 text-2xl font-bold mt-5">
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
                  <div className="text-7xl mb-5">✨</div>

                  <p className="text-gray-400 text-2xl">
                    Hasil anime akan muncul di sini
                  </p>
                </div>
              )}
            </div>

            {/* DOWNLOAD BUTTON */}
            <div className="mt-6">
              <button
                onClick={downloadImage}
                className="w-full py-6 rounded-[20px] bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black text-3xl hover:scale-[1.02] transition-all"
              >
                ⬇ Download Result
              </button>
            </div>
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
