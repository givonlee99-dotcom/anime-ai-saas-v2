export default async function Gallery() {
  let images = [];

  try {
    const res = await fetch(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/list/anime-ai.json`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

 images = data.resources.map(
   (item: any) =>
     `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${item.public_id}.${item.format}`,
 );
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Anime Gallery
        </h1>

        <p className="text-white/50 mb-10">
          Explore AI-generated anime artwork
        </p>

        {images.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            No images uploaded yet
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {images.map((img: any, index: number) => (
              <div
                key={index}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5"
              >
                <img
                  src={img}
                  alt="Anime"
                  className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
