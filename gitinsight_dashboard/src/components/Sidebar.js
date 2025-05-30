import React from "react";

// PUBLIC_INTERFACE
export default function Sidebar({ activePage, setActivePage }) {
  const menu = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "repositories", label: "Repositories", icon: "📁" },
    { key: "commits", label: "Commits", icon: "📝" },
    { key: "insights", label: "Insights", icon: "💡" },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span style={{color:'#28a745', marginRight: 6, fontWeight:900, fontSize:'1.6em'}}>G</span>
        itInsight
      </div>
      <nav style={{ marginTop: 16 }}>
        {menu.map(m => (
          <SidebarNavItem
            key={m.key}
            m={m}
            active={activePage === m.key}
            onClick={() => setActivePage(m.key)}
          />
        ))}
      </nav>
      <div style={{ flex: 1 }} />
      <div style={{textAlign: 'center', color:'#dadada', fontSize:12, padding: '0 12px 32px', opacity: .45}}>
        <span>© 2024 GitInsight</span>
      </div>
    </aside>
  );
}

// PUBLIC_INTERFACE
function SidebarNavItem({ m, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        background: active ? "#2b9c47" : "none",
        color: active ? "#fff" : "#dadada",
        padding: "12px 32px",
        fontWeight: active ? 700 : 500,
        borderLeft: active ? "4px solid #28a745" : "4px solid transparent",
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontSize: "1.07em",
        letterSpacing: ".01em",
        transition: "all .16s",
        userSelect: "none",
      }}
    >
      <span>{m.icon}</span>
      {m.label}
    </div>
  );
}
