"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  const handleDownload = async (url: string) => {
    try {
      // Create an invisible iframe for download
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Set iframe source to our download URL
      iframe.src = `/api/download?url=${encodeURIComponent(url)}`;

      // Remove iframe after a short delay
      setTimeout(() => {
        iframe.remove();
      }, 2000);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
      <div className="max-w-screen-xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0">
        <div className="max-w-xl">
          <Badge className="rounded-full py-1 border-none">
            Just released v1.0.0
          </Badge>
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
            Human-AI Co working Space
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            A human-AI co-working space interface that allows you to collaborate
            with AI in a seamless and intuitive way.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full text-base"
              onClick={() =>
                handleDownload(
                  process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_LINK || ""
                )
              }
            >
              Download For Windows
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base shadow-none"
              onClick={() =>
                handleDownload(process.env.NEXT_PUBLIC_MAC_DOWNLOAD_LINK || "")
              }
            >
              Download For Mac
            </Button>
          </div>
        </div>
        <div className="relative lg:max-w-lg xl:max-w-xl w-full bg-transparent rounded-xl aspect-video">
          <Image
            src="/coworking-image.png"
            fill
            alt="Human-AI Co-working Space Interface"
            className="object-contain rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
