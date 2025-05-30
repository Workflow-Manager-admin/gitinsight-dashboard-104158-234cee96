import React from "react";
import { useGitHub } from "../../hooks/github-api";

// PUBLIC_INTERFACE
export default function CommitHistoryViewer() {
  const { commitsData, refetchCommits } = useGitHub();
  const { loading, error, data: commits } = commitsData || {};

  return (
    <section>
      <h2
        style={{
          fontSize: "1.6em",
          color: "#2b9c47",
          fontWeight: 700,
          margin: 0,
          marginBottom: 18,
        }}
      >
        Commit History
      </h2>
      <div style={{ marginBottom: 18, color: "#555" }}>
        Browse all commits, activity per repo, search, and more.
        <br />
        <span style={{ color: "#aaa", fontSize: 13 }}>
          {loading || error
            ? null
            : commits && commits.length
            ? "Your recent commits."
            : "No commit history."}
        </span>
      </div>
      <div style={{marginBottom: 12}}>
        <button
          className="btn"
          style={{ fontSize: 13, background: "#2b9c47", color: "#fff", marginRight: 6 }}
          onClick={refetchCommits}
          disabled={!!loading}
        >
          {loading ? "Refreshing..." : "Refresh Commits"}
        </button>
      </div>
      {loading ? (
        <div className="dashboard-card">Loading commit history...</div>
      ) : error ? (
        <div className="dashboard-card" style={{ color: "#e14545" }}>
          Failed to fetch commit history.<br/>
          <code style={{color: "#e14545", fontSize: 13}}>{error}</code>
        </div>
      ) : !commits || commits.length === 0 ? (
        <div className="dashboard-card" style={{ color: "#aaa" }}>
          No commits found.
        </div>
      ) : (
        <CommitTable commits={commits} />
      )}
    </section>
  );
}

function CommitTable({ commits }) {
  return (
    <table style={{ width: "100%", borderSpacing: 0 }}>
      <thead>
        <tr>
          <th align="left" style={thStyle}>
            Message
          </th>
          <th style={thStyle}>Repository</th>
          <th style={thStyle}>Date</th>
        </tr>
      </thead>
      <tbody>
        {commits.map((c, i) => (
          <tr key={i} style={{ background: i % 2 ? "#f8fafb" : "#fff" }}>
            <td style={tdStyle}>{c.message}</td>
            <td style={tdStyleCenter}>{c.repo}</td>
            <td style={tdStyleCenter}>{c.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = {
  background: "#fff",
  padding: "16px 18px",
  color: "#24292e",
  fontWeight: 600,
  fontSize: 15.5,
  borderBottom: "1.5px solid #e6e6e6",
};

const tdStyle = {
  padding: "13px 18px",
  fontSize: 15,
  borderBottom: "1px solid #eee",
  color: "#222",
};
const tdStyleCenter = {
  ...tdStyle,
  textAlign: "center",
};
