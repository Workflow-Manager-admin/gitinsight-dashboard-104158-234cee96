import React, { useState } from 'react';
import './App.css';

/**
 * GITINSIGHT COLORS (provided):
 *  primary: #24292e (main bg/nav)
 *  secondary: #2b9c47 (sidebar, accent)
 *  accent: #28a745 (highlight, chart, btn)
 *  Light theme: text dark-on-light
 *  See App.css for custom style overrides.
 */

// Utility: fake user auth state
const defaultUser = { name: "Dev User", avatar: "https://avatars.githubusercontent.com/u/9919?v=4" }; // Placeholder avatar

// PUBLIC_INTERFACE
function App() {
  // User sign-in state
  const [user, setUser] = useState(null);

  // Main nav: 'dashboard', 'repositories', 'commits', 'insights'
  const [activePage, setActivePage] = useState('dashboard');

  // Placeholder API connect
  // const connectAPI = () => {};

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f7f9fa' }}>
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar user={user} onSignIn={() => setUser(defaultUser)} onSignOut={() => setUser(null)} />
        <main style={{
          flex: 1,
          padding: '32px 32px 0 32px',
          background: 'white',
          minHeight: 0,
          overflowY: 'auto',
        }}>
          {!user ? (
            <SignInArea onSignIn={() => setUser(defaultUser)} />
          ) : (
            <DashboardRouter activePage={activePage} />
          )}
        </main>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function Sidebar({ activePage, setActivePage }) {
  const menu = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "repositories", label: "Repositories", icon: "📁" },
    { key: "commits", label: "Commits", icon: "📝" },
    { key: "insights", label: "Insights", icon: "💡" },
  ];
  return (
    <aside style={{
      width: 220,
      background: "#24292e",
      color: "#fff",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      paddingTop: 0,
      boxShadow: '2px 0 6px rgba(36,41,46,0.05)',
    }}>
      <div style={{
        fontWeight: 700,
        fontSize: '1.35rem',
        letterSpacing: '.04em',
        padding: '28px 0 32px 0',
        textAlign: "center",
        borderBottom: "1px solid #31363d"
      }}>
        <span style={{
          color: '#28a745',
          marginRight: 6,
          fontWeight: 900,
          fontSize: '1.6em',
        }}>G</span>
        itInsight
      </div>
      <nav style={{ marginTop: 16 }}>
        {menu.map(m => (
          <SidebarNavItem key={m.key} m={m} active={activePage===m.key} onClick={() => setActivePage(m.key)} />
        ))}
      </nav>
      <div style={{ flex: 1 }} /> {/* Filler */}
      <div style={{textAlign:'center', color:'#dadada', fontSize:12, padding: '0 12px 32px', opacity: .45}}>
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
        cursor: 'pointer',
        background: active ? "#2b9c47" : "none",
        color: active ? "#fff" : "#dadada",
        padding: "12px 32px",
        fontWeight: active ? 700 : 500,
        borderLeft: active ? '4px solid #28a745' : '4px solid transparent',
        display: 'flex', alignItems: 'center', gap: 14,
        fontSize: '1.07em',
        letterSpacing: '.01em',
        transition: 'all .16s',
        userSelect: 'none'
      }}
    >
      <span>{m.icon}</span>
      {m.label}
    </div>
  );
}

// PUBLIC_INTERFACE
function TopBar({ user, onSignIn, onSignOut }) {
  return (
    <header style={{
      width: '100%',
      background: "#fff",
      borderBottom: "1.5px solid #e6e6e6",
      minHeight: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: "0 32px"
    }}>
      <span style={{
        fontWeight: 600,
        fontSize: '1.13em',
        letterSpacing: '.048em',
        color: '#2b9c47',
        display: 'flex', alignItems: 'center',
      }}>
        <span style={{
          width:28, height:28, borderRadius:"50%", background: "#2b9c47", color:"#fff",
          display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:20, marginRight:10, fontWeight:900
        }}>G</span> GitInsight Dashboard
      </span>
      <div>
        {!user
          ? <button className="btn" style={{ background: "#24292e" }} onClick={onSignIn}>Sign in with Git Account</button>
          : <UserProfileMenu user={user} onSignOut={onSignOut} />
        }
      </div>
    </header>
  );
}

// PUBLIC_INTERFACE
function UserProfileMenu({ user, onSignOut }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <img
        src={user.avatar}
        alt="profile"
        style={{
          width: 34, height: 34, borderRadius: '50%',
          border: "2.5px solid #28a745", objectFit: "cover" }}
      />
      <span style={{ fontWeight: 600, color: '#24292e', marginRight: 14 }}>{user.name}</span>
      <button className="btn" style={{
        background: "#2b9c47", color: "#fff", fontSize: 14, fontWeight: 700, padding: '6px 16px'
      }} onClick={onSignOut}>Sign out</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function SignInArea({ onSignIn }) {
  // Placeholder Info splash
  return (
    <div style={{
      maxWidth: 440,
      margin: "72px auto",
      textAlign: "center",
      background: "#f4f8f6",
      borderRadius: 14,
      padding: '48px 36px',
      boxShadow: "0 2px 20px 0 rgba(36,41,46, 0.07)"
    }}>
      <div style={{ fontWeight: 700, color: "#28a745", fontSize: 22, marginBottom: 16 }}>Welcome to GitInsight</div>
      <div style={{ fontSize: 15.6, color: '#444', marginBottom: 22, lineHeight: 1.45 }}>
        Sign in to connect your Git account and unlock powerful analytics for all your repositories, commits, and user activity.
      </div>
      {/* Placeholder - Sign in action */}
      <button className="btn btn-large" style={{background:"#24292e"}} onClick={onSignIn}>
        <span style={{marginRight:6, fontWeight:700, fontSize:20}}>🔐</span>
        Sign in with GitHub
      </button>
      <div style={{fontSize:12, color:'#aaa', marginTop:22}}>API integration coming soon.</div>
    </div>
  );
}

// PUBLIC_INTERFACE
function DashboardRouter({ activePage }) {
  // Switches between main dashboard pages
  if (activePage === 'dashboard') return <DashboardMain />;
  if (activePage === 'repositories') return <RepositoriesView />;
  if (activePage === 'commits') return <CommitsView />;
  if (activePage === 'insights') return <InsightsView />;
  return null;
}

// PUBLIC_INTERFACE
function DashboardMain() {
  // Main Dashboard: Highlights, mini graphs, general stats, activity chart
  return (
    <section>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
        <DashboardCard
          title="Total Repositories"
          value="--"
          description="Connect API for data"
          icon="📁"
          color="#2b9c47"
        />
        <DashboardCard
          title="Total Commits"
          value="--"
          description="Connect API for data"
          icon="📝"
          color="#28a745"
        />
        <DashboardCard
          title="Active This Week"
          value="--"
          description="User activity (API pending)"
          icon="💡"
          color="#f0c419"
        />
      </div>
      <div style={{ marginBottom: 22, fontSize: 19.5, fontWeight: 600, color: "#24292e" }}>
        Recent Activity (placeholder)
      </div>
      <div style={{
        height: 220,
        background: "#f8fafb",
        border: "1.5px solid #e0e0e0",
        borderRadius: 7,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: "#888", fontStyle: 'italic', fontSize: 17,
      }}>
        [Activity Chart Will Display Here]
      </div>
      <div style={{ fontSize: 13, color: "#bbb", marginTop: 18 }}>Coming soon: API analytics & activity graph</div>
    </section>
  );
}

// PUBLIC_INTERFACE
function DashboardCard({ title, value, description, icon, color }) {
  return (
    <div style={{
      minWidth: 230,
      flex: 1,
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 16px 0 rgba(36,41,46, 0.075)",
      padding: '28px 0 22px 0',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: `1.5px solid ${color}22`
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: "50%",
        background: color ?? "#ebebeb", marginBottom: 10,
        color: "#fff", display: 'flex', alignItems:'center', justifyContent:'center', fontSize: 24,
        boxShadow: "0 1.5px 9px 0 rgba(36,41,46,0.10)"
      }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 23, color: "#2b9c47", marginBottom:5 }}>{value}</div>
      <div style={{ fontSize: 15.5, color: "#24292e", fontWeight: 500, marginBottom: 5 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#aaa", marginTop: 6 }}>{description}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
function RepositoriesView() {
  // Main area for repo analytics, placeholder layout
  return (
    <section>
      <h2 style={{ fontSize: "1.6em", color: "#28a745", fontWeight: 700, margin: 0, marginBottom: 18 }}>
        Repositories Overview
      </h2>
      <div style={{ marginBottom: 18, color: "#555" }}>
        Analyze all repositories, see stats, filter, explore details.<br />
        <span style={{ color: "#aaa", fontSize:13 }}>API connection will populate this area.</span>
      </div>
      <div style={{ 
        border: "1.5px solid #e0e0e0",
        borderRadius: 8,
        background: "#fbfbfa",
        padding: "32px 20px", color: "#aaa",
        textAlign: "center", fontStyle: "italic"
      }}>
        [Repository table/analytics cards will be displayed here.]
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function CommitsView() {
  // Chronological view of commits
  return (
    <section>
      <h2 style={{ fontSize: "1.6em", color: "#2b9c47", fontWeight: 700, margin: 0, marginBottom: 18 }}>
        Commit History
      </h2>
      <div style={{ marginBottom: 18, color: "#555" }}>
        Browse all commits, activity per repo, search, and more.<br />
        <span style={{ color: "#aaa", fontSize:13 }}>API connection will display real history.</span>
      </div>
      <div style={{
        border: "1.5px solid #e0e0e0",
        borderRadius: 8,
        background: "#fbfbfa",
        padding: "32px 20px", color: "#aaa", textAlign: "center", fontStyle: "italic"
      }}>
        [Commit history, table, and commit analytics will be displayed here.]
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function InsightsView() {
  // User activity insights (graphs, top repos, peaks, trends)
  return (
    <section>
      <h2 style={{ fontSize: "1.6em", color: "#24292e", fontWeight: 700, margin: 0, marginBottom: 18 }}>
        User Activity Insights
      </h2>
      <div style={{ marginBottom: 18, color: "#555" }}>
        Discover your most active periods, contribution stats, and trends.<br />
        <span style={{ color: "#aaa", fontSize:13 }}>API connection will bring graphs and insights here.</span>
      </div>
      <div style={{
        border: "1.5px solid #e0e0e0",
        borderRadius: 8,
        background: "#fbfbfa",
        padding: "32px 20px", color: "#aaa", textAlign: "center", fontStyle: "italic"
      }}>
        [Graphs, timeline, and user analytics to come.]
      </div>
    </section>
  );
}

export default App;
