import type { Metadata } from "next";
import Script from "next/script";
import { Lato, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-sans",
  subsets: ["latin"],
});

const lato = Lato({
  weight: "400",
  variable: "--font-lato-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://papemosque.ca"),
  title: {
    default: "Turkish Islamic Center Canada",
    template: "%s | Turkish Islamic Center Canada",
  },
  description:
    "Turkish Islamic Center Canada (Pape Camii), Toronto’da 24 saat açık ibadet imkânı, Kur’an dersleri, cemaat buluşmaları ve bağış bilgileri sunar.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://papemosque.ca/",
    siteName: "Turkish Islamic Center Canada",
    title: "Turkish Islamic Center Canada",
    description:
      "Turkish Islamic Center Canada (Pape Camii), Toronto’da 24 saat açık ibadet imkânı, Kur’an dersleri, cemaat buluşmaları ve bağış bilgileri sunar.",
    images: [
      {
        url: "/og.jpeg",
        width: 1200,
        height: 630,
        alt: "Turkish Islamic Center Canada - Pape Camii",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turkish Islamic Center Canada",
    description:
      "Turkish Islamic Center Canada (Pape Camii), Toronto’da 24 saat açık ibadet imkânı, Kur’an dersleri, cemaat buluşmaları ve bağış bilgileri sunar.",
    images: ["/og.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

// -------- JSON-LD (Schema.org) --------
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://papemosque.ca/",
  name: "Turkish Islamic Center Canada",
  inLanguage: "tr",
  publisher: {
    "@type": "Organization",
    name: "Turkish Islamic Center Canada",
    logo: {
      "@type": "ImageObject",
      url: "https://papemosque.ca/logo.jpeg",
    },
  },
};

export const mosqueJsonLd = {
  "@context": "https://schema.org",
  "@type": "Mosque",
  name: "Turkish Islamic Center Canada",
  url: "https://papemosque.ca/",
  email: "info@papecami.com",
  telephone: "+1-647-834-2000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "336 Pape Ave",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M4M 2W7",
    addressCountry: "CA",
  },
  image: "https://papemosque.ca/og.jpeg",
  logo: "https://papemosque.ca/logo.jpeg",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  foundingDate: "1983-04",
  hasMap: "https://maps.app.goo.gl/32uuUt7L7MBrpKUT8",
  areaServed: "Toronto, Ontario, Canada",
  potentialAction: {
    "@type": "DonateAction",
    target: "https://papemosque.ca/donation",
  },
};

export const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: "https://papemosque.ca/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bağış",
      item: "https://papemosque.ca/donation",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${bricolageGrotesque.variable} antialiased font-sans`}
      >
        <Navbar />
        {children}
        <Footer />

        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="ld-mosque"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mosqueJsonLd) }}
        />
        <Script
          id="ld-breadcrumbs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </body>
    </html>
  );
}
