import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function UserActivityInsights({ api, user }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    setError("");
    if (!user) {
      setInsights(null);
      setLoading(false);
      return;
    }
    // Placeholder async fetch
    setTimeout(() => {
      // Replace with data from "/api/insights"
      setInsights({
        mostActiveDay: "Wednesday",
        topRepo: "gitinsight-dashboard",
        streak: 12,
      });
      setLoading(false);
    }, 500);
  }, [user]);
  return (
    <section>
      <h2
        style={{
          fontSize: "1.6em",
          color: "#24292e",
          fontWeight: 700,
          margin: 0,
          marginBottom: 18,
        }}
      >
        User Activity Insights
      </h2>
      <div style={{ marginBottom: 18, color: "#555" }}>
        Discover your most active periods, contribution stats, and trends.
        <br />
        <span style={{ color: "#aaa", fontSize: 13 }}>
          {loading || error ? null : insights ? "Personal trends below." : ""}
        </span>
      </div>
      {loading ? (
        <div
          style={{
            border: "1.5px solid #e0e0e0",
            borderRadius: 8,
            background: "#fbfbfa",
            padding: "32px 20px",
            color: "#aaa",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Loading insights...
        </div>
      ) : error ? (
        <div
          style={{
            border: "1.5px solid #e14545",
            borderRadius: 8,
            background: "#fbfbfa",
            padding: "32px 20px",
            color: "#e14545",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Failed to fetch insights.
        </div>
      ) : insights ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
          <InsightCard
            label="Most Active Day"
            value={insights.mostActiveDay}
            icon="📅"
            color="#2b9c47"
          />
          <InsightCard
            label="Top Repo"
            value={insights.topRepo}
            icon="🏆"
            color="#28a745"
          />
          <InsightCard
            label="Best Streak"
            value={insights.streak + " days"}
            icon="🔥"
            color="#f0c419"
          />
        </div>
      ) : (
        <div
          style={{
            border: "1.5px solid #e0e0e0",
            borderRadius: 8,
            background: "#fbfbfa",
            padding: "32px 20px",
            color: "#aaa",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          No insights available.
        </div>
      )}
    </section>
  );
}

// Mini-card for insights
function InsightCard({ label, value, icon, color }) {
  return (
    <div
      className="dashboard-card"
      style={{ minWidth: 170, maxWidth: 230, border: `1.5px solid ${color}22` }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: color ?? "#ebebeb",
          marginBottom: 8,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 21,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontWeight: 700,
          color: "#2b9c47",
          fontSize: 20,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 14, color: "#24292e", fontWeight: 500 }}>{label}</div>
    </div>
  );
}
