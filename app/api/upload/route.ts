import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const image = body.image;

    if (!image) {
      return Response.json(
        {
          success: false,
          error: "No image",
        },
        {
          status: 400,
        },
      );
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "anime-ai",
    });

    return Response.json({
      success: true,
      url: uploadResponse.secure_url,
    });
  } catch (error: any) {
    console.log(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
