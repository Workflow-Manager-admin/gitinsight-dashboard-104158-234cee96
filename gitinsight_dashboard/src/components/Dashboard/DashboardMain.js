import React, { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard";

// PUBLIC_INTERFACE
export default function DashboardMain({ api, user }) {
  // UI State
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Mimic fetch on mount
  useEffect(() => {
    setLoading(true);
    setError("");
    if (!user) {
      setStats(null);
      setLoading(false);
      return;
    }
    // Placeholder: Simulate API call
    setTimeout(() => {
      // Example: set to dummy stats, replace with real fetch in future
      setStats({
        totalRepos: 7,
        totalCommits: 124,
        weeklyActive: 4,
      });
      setLoading(false);
    }, 700);
  }, [user]);
  return (
    <section>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
        <DashboardCard
          title="Total Repositories"
          value={loading ? "..." : error ? "--" : stats ? stats.totalRepos : "--"}
          description={
            error
              ? "Failed to fetch data."
              : loading
              ? "Loading..."
              : "Your repository count"
          }
          icon="📁"
          color="#2b9c47"
        />
        <DashboardCard
          title="Total Commits"
          value={loading ? "..." : error ? "--" : stats ? stats.totalCommits : "--"}
          description={
            error
              ? "Failed to fetch data."
              : loading
              ? "Loading..."
              : "Your total commits"
          }
          icon="📝"
          color="#28a745"
        />
        <DashboardCard
          title="Active This Week"
          value={loading ? "..." : error ? "--" : stats ? stats.weeklyActive : "--"}
          description={
            error
              ? "Failed to fetch data."
              : loading
              ? "Loading..."
              : "Active repos (7day)"
          }
          icon="💡"
          color="#f0c419"
        />
      </div>
      <div
        style={{
          marginBottom: 22,
          fontSize: 19.5,
          fontWeight: 600,
          color: "#24292e",
        }}
      >
        Recent Activity
      </div>
      <div
        style={{
          height: 220,
          background: "#f8fafb",
          border: "1.5px solid #e0e0e0",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          fontStyle: "italic",
          fontSize: 17,
        }}
      >
        {loading
          ? "[Loading activity chart...]"
          : error
          ? "Failed to load activity chart."
          : "[Activity Chart Will Display Here]"}
      </div>
      <div style={{ fontSize: 13, color: "#bbb", marginTop: 18 }}>
        {error ? "" : "Coming soon: API analytics & activity graph"}
      </div>
    </section>
  );
}
