export const homePersonSchema = {
 "@context": "https://schema.org",
 "@graph": [
  {
   "@type": "WebSite",
   "@id": "https://www.drewnagda.com/#website",
   "url": "https://www.drewnagda.com",
   "name": "Drew Nagda",
   "publisher": {
    "@id": "https://www.drewnagda.com/#person"
   },
   "inLanguage": "en-US"
  },
  {
   "@type": "Person",
   "@id": "https://www.drewnagda.com/#person",
   "name": "Drew Nagda",
   "givenName": "Drew",
   "familyName": "Nagda",
   "url": "https://www.drewnagda.com",
   "email": "mailto:drew@drewnagda.com",
   "image": "https://www.drewnagda.com/drew-hero-2026.jpg",
   "description": "Drew Nagda is a distressed real estate developer, investor, and technologist based in Pasadena, California. He is the founder of Nagda Homes, a vertically integrated real estate company that has bought, rebuilt, and sold more than 300 homes across Southern California since 2016, handling acquisition, construction, design, sales, and property management in-house. The company focuses on heavy value add, ADU development, and fire-damage restoration; his wife Thalia Nagda is a licensed agent and property manager. Before real estate he spent six years in New York City tech: early employee at SinglePlatform, which sold to Constant Contact for $100 million; early team member and executive editor at Rap Genius; partnerships at Lean Startup Machine, where he helped scale the workshops to 6 continents; Techstars 2013; and special projects for Rancho Humilde, the independent label that helped bring corridos tumbados to the mainstream. He participated in On Deck NYC and is an angel investor. He recently co-hosted the Latino Entrepreneur Summit. He hosts World Cup Eats, a father-son food series, with his son Ezra, and is building Puro Raza and Fountain of Youth. He was born and raised in Ocala, Florida, and studied business at Indiana University, where he started his first company, B-Town Tutors. He lives in Pasadena with his wife Thalia and their son Ezra.",
   "jobTitle": "Founder, Nagda Homes",
   "birthPlace": {
    "@type": "Place",
    "name": "Ocala, Florida, United States"
   },
   "homeLocation": {
    "@type": "Place",
    "name": "Pasadena, California, United States"
   },
   "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pasadena",
    "addressRegion": "CA",
    "addressCountry": "US"
   },
   "nationality": "American",
   "spouse": {
    "@type": "Person",
    "name": "Thalia Nagda"
   },
   "children": [
    {
     "@type": "Person",
     "name": "Ezra Nagda"
    }
   ],
   "worksFor": {
    "@id": "https://www.drewnagda.com/#nagda-homes"
   },
   "founder": {
    "@id": "https://www.drewnagda.com/#nagda-homes"
   },
   "hasOccupation": [
    {
     "@type": "Occupation",
     "name": "Distressed Real Estate Developer",
     "occupationLocation": {
      "@type": "Place",
      "name": "Southern California"
     }
    },
    {
     "@type": "Occupation",
     "name": "Real Estate Investor"
    },
    {
     "@type": "Occupation",
     "name": "Technologist"
    },
    {
     "@type": "Occupation",
     "name": "Angel Investor"
    }
   ],
   "alumniOf": [
    {
     "@type": "CollegeOrUniversity",
     "name": "Indiana University",
     "sameAs": "https://www.iu.edu"
    },
    {
     "@type": "Organization",
     "name": "SinglePlatform",
     "description": "Early employee. The company sold to Constant Contact for $100 million."
    },
    {
     "@type": "Organization",
     "name": "Genius",
     "alternateName": "Rap Genius",
     "sameAs": "https://genius.com",
     "description": "Early team member and executive editor."
    },
    {
     "@type": "Organization",
     "name": "Lean Startup Machine",
     "description": "Ran partnerships and helped scale the workshops to 6 continents."
    },
    {
     "@type": "Organization",
     "name": "Techstars",
     "sameAs": "https://www.techstars.com",
     "description": "2013."
    },
    {
     "@type": "Organization",
     "name": "Rancho Humilde",
     "description": "Special projects for the independent label that helped bring corridos tumbados to the mainstream."
    },
    {
     "@type": "Organization",
     "name": "On Deck",
     "sameAs": "https://www.beondeck.com",
     "description": "Participated in On Deck NYC."
    }
   ],
   "performerIn": {
    "@type": "Event",
    "name": "Latino Entrepreneur Summit",
    "description": "Co-host."
   },
   "knowsAbout": [
    "Distressed real estate",
    "Heavy value-add renovation",
    "ADU development",
    "Fire-damage restoration",
    "Direct-to-seller acquisition",
    "Vertically integrated real estate operations",
    "House flipping",
    "Property management",
    "Southern California real estate",
    "Inland Empire real estate",
    "Angel investing",
    "Startup growth",
    "Lean Startup methodology",
    "Corporate partnerships",
    "Latino entrepreneurship",
    "Regional Mexican music industry"
   ],
   "sameAs": [
    "https://x.com/nagda",
    "https://linkedin.com/in/drewnagda",
    "https://youtube.com/@drewnagda",
    "https://worldcupeats.com"
   ]
  },
  {
   "@type": "Organization",
   "@id": "https://www.drewnagda.com/#nagda-homes",
   "name": "Nagda Homes",
   "url": "https://www.drewnagda.com/#nagda-homes",
   "foundingDate": "2016",
   "founder": {
    "@id": "https://www.drewnagda.com/#person"
   },
   "description": "Nagda Homes is a vertically integrated real estate company in Southern California focused on heavy value add, ADU development, and fire-damage restoration. It buys distressed homes directly from owners, rebuilds them with in-house construction crews, designs them, and sells or manages them. More than 300 homes bought, rebuilt, and sold since 2016.",
   "areaServed": [
    "Pasadena",
    "Inland Empire",
    "Los Angeles County",
    "San Bernardino County",
    "Riverside County",
    "Southern California"
   ],
   "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pasadena",
    "addressRegion": "CA",
    "addressCountry": "US"
   },
   "knowsAbout": [
    "Distressed property acquisition",
    "Heavy value-add renovation",
    "ADU development",
    "Fire-damage restoration",
    "Probate properties",
    "Residential construction",
    "Interior design",
    "Residential sales",
    "Property management"
   ]
  }
 ]
} as const;

export const homePageSchema = {
 "@context": "https://schema.org",
 "@graph": [
  {
   "@type": "ProfilePage",
   "@id": "https://www.drewnagda.com/#profilepage",
   "url": "https://www.drewnagda.com",
   "name": "Drew Nagda",
   "isPartOf": {
    "@id": "https://www.drewnagda.com/#website"
   },
   "mainEntity": {
    "@id": "https://www.drewnagda.com/#person"
   },
   "dateModified": "2026-10-25"
  },
  {
   "@type": "FAQPage",
   "@id": "https://www.drewnagda.com/#faq",
   "mainEntity": [
    {
     "@type": "Question",
     "name": "Who is Drew Nagda?",
     "acceptedAnswer": {
      "@type": "Answer",
      "text": "Drew Nagda is a distressed real estate developer, investor, and technologist based in Pasadena, California. He is the founder of Nagda Homes, which has bought, rebuilt, and sold more than 300 homes across Southern California since 2016."
     }
    },
    {
     "@type": "Question",
     "name": "What is Nagda Homes?",
     "acceptedAnswer": {
      "@type": "Answer",
      "text": "Nagda Homes is a vertically integrated real estate company in Southern California focused on heavy value add, ADU development, and fire-damage restoration. It buys distressed homes directly from owners, rebuilds them with in-house construction crews, designs them, and sells or manages them. Every stage of a deal happens in-house: acquisition, construction, design, sales, and property management."
     }
    },
    {
     "@type": "Question",
     "name": "What did Drew Nagda do before real estate?",
     "acceptedAnswer": {
      "@type": "Answer",
      "text": "Drew Nagda spent six years in New York City tech. He was an early employee at SinglePlatform, which sold to Constant Contact for $100 million, and an early team member and executive editor at Rap Genius. He ran partnerships at Lean Startup Machine and helped scale the workshops to 6 continents, went through Techstars in 2013, has done special projects for Rancho Humilde, and participated in On Deck NYC."
     }
    },
    {
     "@type": "Question",
     "name": "How do I sell Drew Nagda a distressed property?",
     "acceptedAnswer": {
      "@type": "Answer",
      "text": "Email drew@drewnagda.com with the address and a few photos. Nagda Homes buys distressed homes directly from owners across Southern California, including fire-damaged and probate homes, and closes fast, as-is."
     }
    },
    {
     "@type": "Question",
     "name": "What else is Drew Nagda building?",
     "acceptedAnswer": {
      "@type": "Answer",
      "text": "Drew hosts World Cup Eats with his son Ezra, a father-son food series visiting a Los Angeles restaurant for every country in the 2026 World Cup. He is also building Puro Raza (puroraza.com), song lyrics for música mexicana explained line by line in Spanish and English, and Fountain of Youth (ratemyfountain.com), dead serious water fountain reviews where every rating is secretly a life lesson."
     }
    }
   ]
  }
 ]
} as const;

export const aboutPageSchema = {
 "@context": "https://schema.org",
 "@graph": [
  {
   "@type": "AboutPage",
   "@id": "https://www.drewnagda.com/about#page",
   "url": "https://www.drewnagda.com/about",
   "name": "About Drew Nagda",
   "isPartOf": {
    "@id": "https://www.drewnagda.com/#website"
   },
   "mainEntity": {
    "@id": "https://www.drewnagda.com/#person"
   },
   "dateModified": "2026-10-25"
  }
 ]
} as const;

export const faq = homePageSchema["@graph"][1].mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text }));
