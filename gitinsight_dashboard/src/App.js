import React, { useState } from 'react';
import './App.css';

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import GitSignIn from "./components/Auth/GitSignIn";
import DashboardMain from "./components/Dashboard/DashboardMain";
import RepositoryAnalytics from "./components/Repositories/RepositoryAnalytics";
import CommitHistoryViewer from "./components/Commits/CommitHistoryViewer";
import UserActivityInsights from "./components/Insights/UserActivityInsights";

// == New: Import API provider/Hooks context ==
import { GitHubProvider } from "./hooks/github-api";

// This represents a signed-in user mock for demonstration (replace with real user + token on OAuth)
const defaultUser = { name: "Dev User", avatar: "https://avatars.githubusercontent.com/u/9919?v=4" };

// PUBLIC_INTERFACE
function App() {
  // User sign-in state
  const [user, setUser] = useState(null);
  // Store OAuth access token (if available)
  const [accessToken, setAccessToken] = useState(null);
  // Main navigation: which page is active
  const [activePage, setActivePage] = useState('dashboard');
  // Track loading state for OAuth sign-in demo
  const [signInLoading, setSignInLoading] = useState(false);

  // Handles OAuth sign-in callback
  // TODO: replace with actual OAuth logic + token retrieval
  function handleSignIn() {
    setSignInLoading(true);
    // Simulate OAuth token received
    setTimeout(() => {
      setUser(defaultUser);
      setAccessToken("PLACEHOLDER_GITHUB_OAUTH_TOKEN"); // Replace with real token!
      setSignInLoading(false);
    }, 1100);
  }

  function handleSignOut() {
    setUser(null);
    setAccessToken(null);
    setActivePage("dashboard");
  }

  // Wrap app in GitHubProvider to access live data via context/hooks
  return (
    <GitHubProvider user={user} accessToken={accessToken}>
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
              <DashboardRouter user={user} />
            )}
          </main>
        </div>
      </div>
    </GitHubProvider>
  );
}

// PUBLIC_INTERFACE
function DashboardRouter({ user, activePage }) {
  // user prop now always passed but page might change in polling
  if (activePage === "dashboard") return <DashboardMain user={user} />;
  if (activePage === "repositories") return <RepositoryAnalytics user={user} />;
  if (activePage === "commits") return <CommitHistoryViewer user={user} />;
  if (activePage === "insights") return <UserActivityInsights user={user} />;
  return null;
}

export default App;
