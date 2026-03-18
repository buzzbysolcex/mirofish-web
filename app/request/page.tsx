"use client";

import { useState } from "react";
import Link from "next/link";

export default function RequestPage() {
  const [tokenName, setTokenName] = useState("");
  const [chain, setChain] = useState("Solana");
  const [contractAddress, setContractAddress] = useState("");
  const [telegram, setTelegram] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const contract = contractAddress || "N/A";
    const message = `MiroFish Simulation Request: ${tokenName} on ${chain}, contract: ${contract}, telegram: ${telegram}`;
    const encoded = encodeURIComponent(message);
    const url = `https://twitter.com/messages/compose?recipient_id=&text=${encoded}`;

    window.open(url, "_blank");
  };

  const inputClasses =
    "w-full bg-bg-card border border-border-card rounded-md px-4 py-3 text-sm text-white placeholder-gray-500 font-mono focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors";

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Back link */}
      <div className="w-full max-w-xl mb-6">
        <Link
          href="/"
          className="text-accent-cyan text-sm hover:underline font-mono"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="w-full max-w-xl mb-8">
        <h1 className="text-2xl font-bold text-accent-cyan text-glow-cyan mb-2 font-mono">
          // REQUEST A LISTING SIMULATION
        </h1>
        <p className="text-gray-400 text-sm font-mono leading-relaxed">
          Submit a token for MiroFish analysis. 20 autonomous agents will
          simulate listing outcomes across 4 market clusters. The Expected
          Value engine will return a <span className="text-accent-green">LIST</span> or{" "}
          <span className="text-accent-red">REJECT</span> verdict.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-bg-card border border-border-card rounded-lg p-8 glow-cyan"
      >
        {/* Token Name */}
        <div className="mb-6">
          <label className="block text-accent-cyan text-xs font-mono mb-2 uppercase tracking-wider">
            Token Name *
          </label>
          <input
            type="text"
            required
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="e.g. BONK"
            className={inputClasses}
          />
        </div>

        {/* Chain */}
        <div className="mb-6">
          <label className="block text-accent-cyan text-xs font-mono mb-2 uppercase tracking-wider">
            Chain *
          </label>
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className={inputClasses + " appearance-none cursor-pointer"}
          >
            <option value="Solana">Solana</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Base">Base</option>
            <option value="BSC">BSC</option>
          </select>
        </div>

        {/* Contract Address */}
        <div className="mb-6">
          <label className="block text-accent-cyan text-xs font-mono mb-2 uppercase tracking-wider">
            Contract Address{" "}
            <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x... or base58 address"
            className={inputClasses}
          />
        </div>

        {/* Telegram */}
        <div className="mb-8">
          <label className="block text-accent-cyan text-xs font-mono mb-2 uppercase tracking-wider">
            Your Telegram Handle *
          </label>
          <input
            type="text"
            required
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@yourtelegram"
            className={inputClasses}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-accent-cyan text-bg-primary font-bold py-3 px-6 rounded-md font-mono text-sm uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] transition-all duration-200 cursor-pointer"
        >
          Submit via Twitter DM
        </button>

        {/* Alternative */}
        <p className="text-center text-gray-500 text-xs font-mono mt-4">
          Or DM{" "}
          <a
            href="https://twitter.com/HidayahAnka1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:underline"
          >
            @HidayahAnka1
          </a>{" "}
          on Twitter directly
        </p>
      </form>

      {/* Footer note */}
      <p className="text-gray-600 text-xs font-mono mt-8 max-w-xl text-center">
        Simulations typically complete within 24-48 hours. Results are delivered
        as a full MiroFish report with agent consensus, cluster scores, and EV
        breakdown.
      </p>
    </div>
  );
}
