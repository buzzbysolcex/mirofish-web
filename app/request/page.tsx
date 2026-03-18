"use client";

import { useState } from "react";
import Link from "next/link";

function isValidEvmAddress(addr: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

function isValidBase58(addr: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RequestPage() {
  const [tokenName, setTokenName] = useState("");
  const [chain, setChain] = useState("Solana");
  const [contractAddress, setContractAddress] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState<{
    tokenName?: string;
    contractAddress?: string;
    email?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!tokenName.trim()) {
      newErrors.tokenName = "Required";
    }

    if (!contractAddress.trim()) {
      newErrors.contractAddress = "Required";
    } else {
      const isEvm = chain === "Ethereum" || chain === "Base" || chain === "BSC";
      if (isEvm && !isValidEvmAddress(contractAddress.trim())) {
        newErrors.contractAddress = "Invalid EVM address (must start with 0x, 42 chars)";
      } else if (chain === "Solana" && !isValidBase58(contractAddress.trim())) {
        newErrors.contractAddress = "Invalid Solana address (base58, 32-44 chars)";
      } else if (chain === "Tron" && !contractAddress.trim().startsWith("T")) {
        newErrors.contractAddress = "Invalid Tron address (must start with T)";
      }
    }

    if (email.trim() && !isValidEmail(email.trim())) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const message = `MicroBuzz Simulation Request: ${tokenName} on ${chain}, contract: ${contractAddress}`;
    const encoded = encodeURIComponent(message);
    const url = `https://twitter.com/messages/compose?text=${encoded}`;

    window.open(url, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputBase =
    "w-full bg-[#12121a] border rounded-md px-4 py-3 text-sm text-white placeholder-gray-500 font-mono focus:outline-none focus:ring-1 transition-colors";
  const inputNormal = `${inputBase} border-[#1a1a2e] focus:border-[#00ffff] focus:ring-[#00ffff]`;
  const inputError = `${inputBase} border-[#ff4444] focus:border-[#ff4444] focus:ring-[#ff4444]`;

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Back link */}
      <div className="w-full max-w-xl mb-6">
        <Link
          href="/"
          className="text-[#00ffff] text-sm hover:underline font-mono"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="w-full max-w-xl mb-8">
        <h1 className="text-2xl font-bold text-[#00ffff] text-glow-cyan mb-2 font-mono">
          // REQUEST A LISTING SIMULATION
        </h1>
        <p className="text-gray-400 text-sm font-mono leading-relaxed">
          Submit a token for analysis. 20 autonomous agents will
          simulate listing outcomes across 4 market clusters. The Expected
          Value engine will return a <span className="text-[#00ff88]">LIST</span> or{" "}
          <span className="text-[#ff4444]">REJECT</span> verdict.
        </p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="w-full max-w-xl mb-4 p-4 bg-[#00ff88]/10 border border-[#00ff88] rounded-lg text-center">
          <p className="text-[#00ff88] font-mono text-sm font-bold">
            Request sent! We&apos;ll DM you on Twitter.
          </p>
        </div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-xl bg-[#12121a] border border-[#1a1a2e] rounded-lg p-8"
        style={{ boxShadow: "0 0 15px rgba(0, 255, 255, 0.15)" }}
      >
        {/* Token Name */}
        <div className="mb-6">
          <label className="block text-[#00ffff] text-xs font-mono mb-2 uppercase tracking-wider">
            Token Name *
          </label>
          <input
            type="text"
            value={tokenName}
            onChange={(e) => { setTokenName(e.target.value); setErrors((prev) => ({ ...prev, tokenName: undefined })); }}
            placeholder="e.g. BONK"
            className={errors.tokenName ? inputError : inputNormal}
          />
          {errors.tokenName && (
            <p className="text-[#ff4444] text-xs font-mono mt-1">{errors.tokenName}</p>
          )}
        </div>

        {/* Chain */}
        <div className="mb-6">
          <label className="block text-[#00ffff] text-xs font-mono mb-2 uppercase tracking-wider">
            Chain *
          </label>
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className={`${inputNormal} appearance-none cursor-pointer`}
          >
            <option value="Solana">Solana</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Base">Base</option>
            <option value="BSC">BSC</option>
            <option value="Tron">Tron</option>
          </select>
        </div>

        {/* Contract Address */}
        <div className="mb-6">
          <label className="block text-[#00ffff] text-xs font-mono mb-2 uppercase tracking-wider">
            Contract Address *
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => { setContractAddress(e.target.value); setErrors((prev) => ({ ...prev, contractAddress: undefined })); }}
            placeholder="0x... or base58 address"
            className={errors.contractAddress ? inputError : inputNormal}
          />
          {errors.contractAddress && (
            <p className="text-[#ff4444] text-xs font-mono mt-1">{errors.contractAddress}</p>
          )}
        </div>

        {/* Telegram */}
        <div className="mb-6">
          <label className="block text-[#00ffff] text-xs font-mono mb-2 uppercase tracking-wider">
            Telegram Handle{" "}
            <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@yourtelegram"
            className={inputNormal}
          />
        </div>

        {/* Email */}
        <div className="mb-8">
          <label className="block text-[#00ffff] text-xs font-mono mb-2 uppercase tracking-wider">
            Email{" "}
            <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
            placeholder="you@example.com"
            className={errors.email ? inputError : inputNormal}
          />
          {errors.email && (
            <p className="text-[#ff4444] text-xs font-mono mt-1">{errors.email}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full font-bold py-3 px-6 rounded-md font-mono text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer"
          style={{
            background: "#00ffff",
            color: "#0a0a0f",
            boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.3)";
          }}
        >
          Submit via Twitter DM
        </button>

        {/* Fallback Contact */}
        <div className="mt-6 pt-4 border-t border-[#1a1a2e]">
          <p className="text-gray-500 text-xs font-mono mb-2 text-center">
            Or reach out directly:
          </p>
          <div className="flex justify-center gap-6 text-xs font-mono">
            <a
              href="https://twitter.com/HidayahAnka1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00ffff] hover:underline"
            >
              Twitter: @HidayahAnka1
            </a>
            <a
              href="https://t.me/Ogie2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00ffff] hover:underline"
            >
              Telegram: @Ogie2
            </a>
          </div>
        </div>
      </form>

      {/* Footer note */}
      <p className="text-gray-600 text-xs font-mono mt-8 max-w-xl text-center">
        Simulations typically complete within 24-48 hours. Results are delivered
        as a full report with agent consensus, cluster scores, and EV
        breakdown.
      </p>
    </div>
  );
}
