import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const videoSources = [
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/f45b112be6463abb54b8bcd5ef92680c/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/408ad52e3f15bc8f01ae69d194a8cf3a/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/b17f76a1270818e8cdc55e8719b9ace8/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/df176a2fb2ea2b64bd21ae1c10d3af6a/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/c5a2cbf9bc2b40ae840525adb59ecb53/manifest/video.m3u8",
  "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/0334468bdc3b2ef521fa863fa34e69df/manifest/video.m3u8",
];

interface VideoCardProps {
  src: string;
  isExpanded: boolean;
  onHover: () => void;
  index: number;
}

const VideoCard = ({ src, isExpanded, onHover, index }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border/30 transition-all duration-500 ease-out cursor-pointer ${
        isExpanded ? "flex-[3]" : "flex-[1]"
      }`}
      onMouseEnter={onHover}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
    </div>
  );
};

const VideoCardsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            {videoSources.map((src, index) => (
              <MobileVideoCard key={index} src={src} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-3 h-[400px]">
          {videoSources.map((src, index) => (
            <VideoCard
              key={index}
              src={src}
              isExpanded={expandedIndex === index}
              onHover={() => setExpandedIndex(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MobileVideoCard = ({ src, index }: { src: string; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/30 h-[200px]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
    </div>
  );
};

export default VideoCardsSection;
