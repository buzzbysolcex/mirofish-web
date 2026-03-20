import type { Metadata } from "next";
import "./globals.css";
// LivePriceTicker rendered on homepage only (not layout — conflicts with Navbar z-index)

export const metadata: Metadata = {
  title: "MicroBuzz — Simulation-Powered Token Listing Intelligence",
  description: "20 AI agents simulate token listing outcomes across 4 market clusters. Expected Value engine decides LIST or REJECT. Built by Buzz BD Agent for SolCex Exchange.",
  openGraph: {
    title: "MicroBuzz — Token Listing Simulation Engine",
    description: "The world's first autonomous exchange listing simulation. 20 agents. 4 clusters. EV math.",
    url: "https://microbuzz.vercel.app",
    siteName: "MicroBuzz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BuzzBySolCex",
    title: "MicroBuzz — Token Listing Simulation",
    description: "20 agents. 4 clusters. EV = P(success) x reward - P(failure) x cost. LIST or REJECT.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen relative" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {children}
      </body>
    </html>
  );
}
