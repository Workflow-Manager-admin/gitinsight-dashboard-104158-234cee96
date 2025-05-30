import React, { useState } from 'react';
import './App.css';

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import GitSignIn from "./components/Auth/GitSignIn";
import DashboardMain from "./components/Dashboard/DashboardMain";
import RepositoryAnalytics from "./components/Repositories/RepositoryAnalytics";
import CommitHistoryViewer from "./components/Commits/CommitHistoryViewer";
import UserActivityInsights from "./components/Insights/UserActivityInsights";

const defaultUser = { name: "Dev User", avatar: "https://avatars.githubusercontent.com/u/9919?v=4" };

// PUBLIC_INTERFACE
function App() {
  // User sign-in state
  const [user, setUser] = useState(null);
  // Main navigation: which page is active
  const [activePage, setActivePage] = useState('dashboard');
  // Track loading state for OAuth sign-in demo
  const [signInLoading, setSignInLoading] = useState(false);

  // Handles OAuth sign-in callback (placeholder)
  function handleSignIn() {
    setSignInLoading(true);
    // Simulate a short sign-in Oauth flow
    setTimeout(() => {
      setUser(defaultUser);
      setSignInLoading(false);
    }, 1100);
  }

  function handleSignOut() {
    setUser(null);
    setActivePage("dashboard");
  }

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar
          user={user}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        />
        <main
          style={{
            flex: 1,
            padding: '32px 32px 0 32px',
            background: 'white',
            minHeight: 0,
            overflowY: 'auto',
          }}
        >
          {!user ? (
            <GitSignIn onSignIn={handleSignIn} loading={signInLoading} />
          ) : (
            <DashboardRouter user={user} activePage={activePage} />
          )}
        </main>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function DashboardRouter({ user, activePage }) {
  if (activePage === "dashboard") return <DashboardMain user={user} />;
  if (activePage === "repositories") return <RepositoryAnalytics user={user} />;
  if (activePage === "commits") return <CommitHistoryViewer user={user} />;
  if (activePage === "insights") return <UserActivityInsights user={user} />;
  return null;
}

export default App;
