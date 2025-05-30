import React from "react";
import DashboardCard from "./DashboardCard";
import { useGitHub } from "../../hooks/github-api";

// PUBLIC_INTERFACE
export default function DashboardMain() {
  const { repoData, commitsData } = useGitHub();
  const {
    loading: repoLoading,
    error: repoError,
    data: repos,
  } = repoData || {};
  const {
    loading: commitLoading,
    error: commitError,
    data: commits,
  } = commitsData || {};

  const loading = repoLoading || commitLoading;
  const error = repoError || commitError;

  // Compute stats
  let stats = null;
  if (repos && Array.isArray(repos)) {
    // Count repos
    const totalRepos = repos.length;
    // Aggregate commit count from fetched commit list
    const totalCommits = commits ? commits.length : "--";
    // Find how many repos active in last 7 days
    let activeRepos = 0;
    if (commits && Array.isArray(commits)) {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const actives = {};
      commits.forEach(cm => {
        if (!cm.repo || !cm.date) return;
        const cmDate = new Date(cm.date);
        if (cmDate >= weekAgo) actives[cm.repo] = true;
      });
      activeRepos = Object.keys(actives).length;
    }
    stats = { totalRepos, totalCommits, weeklyActive: activeRepos };
  }

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
