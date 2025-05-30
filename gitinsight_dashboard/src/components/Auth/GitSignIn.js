import React from "react";

// PUBLIC_INTERFACE
export default function GitSignIn({ onSignIn, loading }) {
  // Placeholder for OAuth logic; replace with actual OAuth-triggering code.
  function handleSignIn() {
    // Simulate OAuth - real app would redirect window/location to GitHub
    if (onSignIn) onSignIn();
  }

  return (
    <div
      style={{
        maxWidth: 440,
        margin: "72px auto",
        textAlign: "center",
        background: "#f4f8f6",
        borderRadius: 14,
        padding: "48px 36px",
        boxShadow: "0 2px 20px 0 rgba(36,41,46, 0.07)",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          color: "#28a745",
          fontSize: 22,
          marginBottom: 16,
        }}
      >
        Welcome to GitInsight
      </div>
      <div
        style={{
          fontSize: 15.6,
          color: "#444",
          marginBottom: 22,
          lineHeight: 1.45,
        }}
      >
        Sign in to connect your Git account and unlock powerful analytics for all your repositories, commits, and user activity.
      </div>
      <button
        className="btn btn-large"
        style={{
          background: "#24292e",
          opacity: loading ? 0.7 : 1,
          pointerEvents: loading ? "none" : undefined,
        }}
        onClick={handleSignIn}
        disabled={loading}
      >
        <span style={{ marginRight: 6, fontWeight: 700, fontSize: 20 }}>🔐</span>
        {loading ? "Signing in..." : "Sign in with GitHub"}
      </button>
      <div style={{ fontSize: 12, color: "#aaa", marginTop: 22 }}>API integration coming soon.</div>
    </div>
  );
}
