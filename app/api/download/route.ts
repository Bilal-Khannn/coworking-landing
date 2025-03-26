import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const downloadUrl = url.searchParams.get("url");

    if (!downloadUrl) {
      return NextResponse.json(
        { error: "Download URL is required" },
        { status: 400 }
      );
    }

    // Fetch the file from GitHub
    const response = await fetch(downloadUrl, {
      headers: {
        Accept: "application/octet-stream",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to download file" },
        { status: response.status }
      );
    }

    // Get the filename from the URL
    const fileName = downloadUrl.split("/").pop() || "download";

    // Stream the response directly
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": response.headers.get("Content-Length") || "",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
