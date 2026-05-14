import { NextResponse } from "next/server";
const midtransClient = require("midtrans-client");

export async function POST() {
  try {
    const snap = new midtransClient.Snap({
      isProduction: true, // WAJIB TRUE
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: "ORDER-" + Date.now(),
        gross_amount: 5000,
      },

      customer_details: {
        first_name: "AnimeAI User",
        email: "user@gmail.com",
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      token: transaction.token,
    });
  } catch (error: any) {
    console.log("MIDTRANS ERROR:", error.ApiResponse || error.message);

    return NextResponse.json(
      {
        error: error.ApiResponse || error.message,
      },
      {
        status: 500,
      },
    );
  }
}
