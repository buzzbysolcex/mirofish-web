'use client';

import { useState } from 'react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="no-print"
      style={{
        background: '#12121a',
        border: '1px solid #1a1a2e',
        color: '#00ffff',
        padding: '6px 16px',
        borderRadius: '6px',
        fontFamily: 'monospace',
        fontSize: '13px',
        cursor: 'pointer',
      }}
    >
      {copied ? '✓ Copied!' : '🔗 Share Report'}
    </button>
  );
}
