"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
      style={{
        backgroundColor: "rgba(10, 10, 15, 0.92)",
        borderBottom: "1px solid #1a1a2e",
        backdropFilter: "blur(12px)",
        fontFamily: "var(--font-geist-mono), monospace",
      }}
    >
      <Link
        href="/"
        className="text-xl font-bold tracking-wider"
        style={{
          color: "#00ffff",
          textShadow: "0 0 10px rgba(0,255,255,0.5)",
        }}
      >
        🐟 MICROBUZZ
      </Link>
      <div className="flex items-center gap-4 md:gap-6 text-sm">
        <Link href="/simulate" className="transition-colors"
          style={{ color: "#ff00ff" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00ffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#ff00ff")}>
          Terminal
        </Link>
        <Link href="/dashboard" className="transition-colors"
          style={{ color: "#e0e0e0" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00ffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#e0e0e0")}>
          Dashboard
        </Link>
        <Link href="/check" className="transition-colors"
          style={{ color: "#e0e0e0" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00ffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#e0e0e0")}>
          Check
        </Link>
        <a
          href="https://solcex.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          style={{ color: "#e0e0e0" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "#00ffff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "#e0e0e0")
          }
        >
          SolCex
        </a>
        <a
          href="https://twitter.com/BuzzBySolCex"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          style={{ color: "#e0e0e0" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "#00ffff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "#e0e0e0")
          }
        >
          Twitter
        </a>
      </div>
    </nav>
  );
}
