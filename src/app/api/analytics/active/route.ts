import { NextResponse } from "next/server";
import { getActive } from "@/services/server/analytics-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const page = await getActive();
    return NextResponse.json(page);
  } catch (e) {
    console.error("Analytics active fetch error:", e);
    return NextResponse.json(
      { content: [], size: 0, number: 0, totalElements: 0, totalPages: 0 },
      { status: 200 }
    );
  }
}
