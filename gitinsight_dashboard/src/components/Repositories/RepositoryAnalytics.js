import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function RepositoryAnalytics({ api, user }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    if (!user) {
      setRepos([]);
      setLoading(false);
      return;
    }
    // Placeholder async fetch
    setTimeout(() => {
      // Replace with fetch("/api/repos")...
      setRepos([
        { name: "gitinsight-dashboard", stars: 12, forks: 2, issues: 0 },
        { name: "my-utils", stars: 2, forks: 0, issues: 1 },
      ]);
      setLoading(false);
    }, 800);
  }, [user]);

  return (
    <section>
      <h2
        style={{
          fontSize: "1.6em",
          color: "#28a745",
          fontWeight: 700,
          margin: 0,
          marginBottom: 18,
        }}
      >
        Repositories Overview
      </h2>
      <div style={{ marginBottom: 18, color: "#555" }}>
        Analyze all repositories, see stats, filter, explore details.
        <br />
        <span style={{ color: "#aaa", fontSize: 13 }}>
          {loading || error
            ? null
            : repos.length
            ? "Your repositories listed below."
            : "No repositories found."}
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
          Loading repository data...
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
          Failed to fetch repositories.
        </div>
      ) : repos.length === 0 ? (
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
          No repositories found.
        </div>
      ) : (
        <Table repos={repos} />
      )}
    </section>
  );
}

// Simple repo analytics table
function Table({ repos }) {
  return (
    <table style={{ width: "100%", borderSpacing: 0 }}>
      <thead>
        <tr>
          <th align="left" style={thStyle}>
            Name
          </th>
          <th style={thStyle}>Stars</th>
          <th style={thStyle}>Forks</th>
          <th style={thStyle}>Issues</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((r, i) => (
          <tr key={r.name} style={{ background: i % 2 ? "#f8fafb" : "#fff" }}>
            <td style={tdStyle}>{r.name}</td>
            <td style={tdStyleCenter}>{r.stars}</td>
            <td style={tdStyleCenter}>{r.forks}</td>
            <td style={tdStyleCenter}>{r.issues}</td>
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
