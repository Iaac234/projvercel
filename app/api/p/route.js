import { NextResponse } from "next/server";

export async function GET(request, params) {
    return NextResponse.json({}, {
        status: 400,
        statusText: "Access denied..."
    })
}
