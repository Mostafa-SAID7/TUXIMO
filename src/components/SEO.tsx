import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = "TUXIMO - Book Flights, Hotels & Cars | Best Travel Deals",
  description = "Find countless flight options and deals to various destinations around the world. Book flights, hotels, and rental cars with TUXIMO. Experience comfort and safety in every journey.",
  keywords = "flight booking, cheap flights, hotel booking, car rental, travel deals, airline tickets, vacation packages, travel booking",
  image = "/airplane-hero.jpg",
  url = "https://ambition-nine.vercel.app",
  type = "website"
}: SEOProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "TUXIMO",
    "description": description,
    "url": url,
    "logo": `${url}/airplane-promo.png`,
    "image": `${url}${image}`,
    "sameAs": [
      "https://facebook.com/tuximo",
      "https://twitter.com/tuximo",
      "https://instagram.com/tuximo"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "Customer Service",
      "email": "support@tuximo.com",
      "availableLanguage": ["English"]
    },
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "1000+",
      "lowPrice": "290",
      "highPrice": "650",
      "priceCurrency": "USD"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
