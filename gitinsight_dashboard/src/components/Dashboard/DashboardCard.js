import React from "react";

// PUBLIC_INTERFACE
export default function DashboardCard({ title, value, description, icon, color }) {
  return (
    <div
      className="dashboard-card"
      style={{ border: `1.5px solid ${color}22` }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: color ?? "#ebebeb",
          marginBottom: 10,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          boxShadow: "0 1.5px 9px 0 rgba(36,41,46,0.10)",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontWeight: 700,
          fontSize: 23,
          color: "#2b9c47",
          marginBottom: 5,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 15.5,
          color: "#24292e",
          fontWeight: 500,
          marginBottom: 5,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13, color: "#aaa", marginTop: 6 }}>
        {description}
      </div>
    </div>
  );
}
