import { useState, useEffect } from "react";

const flightDestinations = [
  { src: "/Tokyo.jpg", city: "Tokyo, Japan", price: "$308", route: "Surakarta City (SOC) - Singapore (SIN)" },
  { src: "/Paris.jpg", city: "Paris, France", price: "$425", route: "Surakarta City (SOC) - Singapore (SIN)" },
  { src: "/Dubai.jpg", city: "Dubai, UAE", price: "$520", route: "Surakarta City (SOC) - Singapore (SIN)" },
  { src: "/London.jpg", city: "London, UK", price: "$380", route: "Surakarta City (SOC) - Singapore (SIN)" },
  { src: "/New York.jpg", city: "New York, USA", price: "$650", route: "Surakarta City (SOC) - Singapore (SIN)" },
  { src: "/Singapore.jpg", city: "Singapore", price: "$290", route: "Surakarta City (SOC) - Singapore (SIN)" },
];

interface FlightCardProps {
  destination: typeof flightDestinations[0];
  isExpanded: boolean;
  onHover: () => void;
  index: number;
}

const FlightCard = ({ destination, isExpanded, onHover, index }: FlightCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border/30 transition-all duration-500 ease-out cursor-pointer group ${
        isExpanded ? "flex-[3]" : "flex-[1]"
      }`}
      onMouseEnter={onHover}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <img
        src={destination.src}
        alt={destination.city}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Content overlay - shown on hover */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-y-2 group-hover:translate-y-0">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <span className="text-sm font-medium text-black">One Way</span>
        </div>
      </div>
      
      <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-y-2 group-hover:translate-y-0 hover:bg-neon/90">
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-white">{destination.city}</h3>
          <span className="text-2xl font-bold text-neon">{destination.price}</span>
        </div>
        <p className="text-white/90 text-sm">
          {destination.route}
          <span className="text-white/60"> / Pack</span>
        </p>
      </div>
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
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            {flightDestinations.map((destination, index) => (
              <MobileFlightCard key={index} destination={destination} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-12 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Flight Search Tabs */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-full p-2 flex items-center justify-between gap-2 shadow-lg">
            {/* Left side - Class filters */}
            <div className="flex items-center gap-2">
              <button className="px-6 py-3 bg-foreground text-background rounded-full font-medium text-sm transition-all hover:bg-foreground/90">
                All
              </button>
              <button className="px-6 py-3 text-muted-foreground rounded-full font-medium text-sm hover:text-foreground transition-colors">
                Econonmy
              </button>
              <button className="px-6 py-3 text-muted-foreground rounded-full font-medium text-sm hover:text-foreground transition-colors">
                Business
              </button>
            </div>

            {/* Middle - Location filters */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-3 text-muted-foreground rounded-full font-medium text-sm hover:text-foreground transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Surakarta City (SOC)
              </button>
              <button className="px-4 py-3 text-muted-foreground rounded-full font-medium text-sm hover:text-foreground transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Singapore (SIN)
              </button>
            </div>

            {/* Right side - Date, Passengers, and Search */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-3 text-muted-foreground rounded-full font-medium text-sm hover:text-foreground transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Mon, 06 Oct 2025
              </button>
              <button className="px-4 py-3 text-muted-foreground rounded-full font-medium text-sm hover:text-foreground transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                2 adult
              </button>
              <button className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-foreground/90 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 h-[400px]">
          {flightDestinations.map((destination, index) => (
            <FlightCard
              key={index}
              destination={destination}
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

const MobileFlightCard = ({ destination, index }: { destination: typeof flightDestinations[0]; index: number }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/30 h-[200px] group cursor-pointer">
      <img
        src={destination.src}
        alt={destination.city}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          <span className="text-sm font-medium text-black">One Way</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{destination.city}</h3>
          <span className="text-xl font-bold text-neon">{destination.price}</span>
        </div>
        <p className="text-white/90 text-xs">
          {destination.route}
          <span className="text-white/60"> / Pack</span>
        </p>
      </div>
    </div>
  );
};

export default VideoCardsSection;
