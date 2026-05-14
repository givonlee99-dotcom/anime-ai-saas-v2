import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const image = body.image;
    const style = body.style || "Cyber";

    console.log("START IMG2IMG");

    const output = await replicate.run("black-forest-labs/flux-redux-dev", {
      input: {
        redux_image: image,
        prompt: `anime portrait ${style} style, ultra detailed, masterpiece`,
        aspect_ratio: "1:1",
        output_format: "png",
      },
    });

    let imageUrl = "";

    if (Array.isArray(output) && output.length > 0) {
      const firstOutput: any = output[0];

      if (typeof firstOutput === "string") {
        imageUrl = firstOutput;
      } else if (firstOutput && typeof firstOutput.url === "function") {
        imageUrl = firstOutput.url();
      }
    }

    return Response.json({
      success: true,
      image: imageUrl,
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
