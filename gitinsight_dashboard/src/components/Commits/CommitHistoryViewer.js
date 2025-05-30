import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function CommitHistoryViewer({ api, user }) {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    if (!user) {
      setCommits([]);
      setLoading(false);
      return;
    }
    // Placeholder async fetch
    setTimeout(() => {
      // Replace with actual data fetch
      setCommits([
        {
          message: "Initial commit",
          repo: "gitinsight-dashboard",
          date: "2024-04-10",
        },
        {
          message: "Add OAuth",
          repo: "gitinsight-dashboard",
          date: "2024-04-12",
        },
      ]);
      setLoading(false);
    }, 900);
  }, [user]);

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
            : commits.length
            ? "Your recent commits."
            : "No commit history."}
        </span>
      </div>
      {loading ? (
        <div className="dashboard-card">Loading commit history...</div>
      ) : error ? (
        <div className="dashboard-card" style={{ color: "#e14545" }}>
          Failed to fetch commit history.
        </div>
      ) : commits.length === 0 ? (
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
