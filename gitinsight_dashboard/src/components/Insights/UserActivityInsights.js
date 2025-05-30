import React from "react";
import { useGitHub } from "../../hooks/github-api";

// PUBLIC_INTERFACE
export default function UserActivityInsights() {
  const { insightsData, refetchInsights } = useGitHub();
  const { loading, error, data: insights } = insightsData || {};

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
      <div style={{marginBottom: 10}}>
        <button
          className="btn"
          style={{ fontSize: 13, background: "#24292e", color: "#fff", marginRight: 6 }}
          onClick={refetchInsights}
          disabled={!!loading}
        >
          {loading ? "Refreshing..." : "Refresh Insights"}
        </button>
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
          Failed to fetch insights.<br/>
          <code style={{color: "#e14545", fontSize: 13}}>{error}</code>
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
