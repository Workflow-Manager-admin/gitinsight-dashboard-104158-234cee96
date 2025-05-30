import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";

// == GitHub API utils ==
const GH_REST_URL = "https://api.github.com";

// --- Utility to fetch with token and error handling ---
async function githubFetch(path, token, params = {}) {
  if (!token) throw new Error("GitHub token missing");
  const url = path.startsWith("http") ? path : GH_REST_URL + path;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    ...params,
  });
  if (!res.ok) {
    let detail = '';
    try {
      const errorBody = await res.json();
      detail = errorBody.message || res.statusText;
    } catch {
      detail = res.statusText;
    }
    throw new Error("GitHub API error: " + detail);
  }
  return await res.json();
}

// == Context structure ==
const GitHubContext = createContext();

// PUBLIC_INTERFACE
export function GitHubProvider({ user, accessToken, children }) {
  // Memoize hook state per session/user
  const [repoData, setRepoData] = useState({ loading: false, error: null, data: null });
  const [commitsData, setCommitsData] = useState({ loading: false, error: null, data: null });
  const [insightsData, setInsightsData] = useState({ loading: false, error: null, data: null });
  // Refresh intervals
  const pollingRef = useRef({});

  // Helper: fetch all user repos and stats
  const fetchRepos = useCallback(async () => {
    if (!accessToken) { setRepoData({ loading: false, error: null, data: null }); return; }
    setRepoData(r => ({ ...r, loading: true, error: null }));
    try {
      // Fetch user repos (first 100)
      const repos = await githubFetch("/user/repos?per_page=100&type=owner", accessToken);
      setRepoData({ loading: false, error: null, data: repos });
      return repos;
    } catch (e) {
      setRepoData({ loading: false, error: e.message, data: null });
      return null;
    }
  }, [accessToken]);

  // Helper: fetch recent commits from user's repos
  const fetchRecentCommits = useCallback(async () => {
    if (!accessToken) { setCommitsData({ loading: false, error: null, data: null }); return; }
    setCommitsData(c => ({ ...c, loading: true, error: null }));
    try {
      // Fetch user repos to aggregate commits
      const repos = await githubFetch("/user/repos?type=owner&per_page=10", accessToken);
      const allCommits = [];
      // Limit to top 5 recent repos for commit aggregation (avoid rate limit)
      for (let r of repos.slice(0, 5)) {
        try {
          const commits = await githubFetch(`/repos/${r.owner.login}/${r.name}/commits?per_page=5`, accessToken);
          commits.forEach(cm => allCommits.push({
            message: cm.commit.message,
            repo: r.name,
            date: cm.commit.author?.date?.slice(0,10) || "",
          }));
        } catch (err) {
          /* commit fetch may fail due to permissions/private/dormant repo - ignore individual fails */
        }
      }
      allCommits.sort((a, b) => b.date.localeCompare(a.date));
      setCommitsData({ loading: false, error: null, data: allCommits });
      return allCommits;
    } catch (e) {
      setCommitsData({ loading: false, error: e.message, data: null });
      return null;
    }
  }, [accessToken]);

  // Helper: Compute insights from user activity (heuristic)
  const fetchInsights = useCallback(async () => {
    if (!accessToken) { setInsightsData({ loading: false, error: null, data: null }); return; }
    setInsightsData(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Get top 20 commits, aggregate stats
      const repos = await githubFetch("/user/repos?type=owner&per_page=7", accessToken);
      let streak = 0, dates = {}, topRepo = "", maxCommits = 0;
      for (let r of repos) {
        try {
          const commits = await githubFetch(`/repos/${r.owner.login}/${r.name}/commits?per_page=20`, accessToken);
          // Track day histogram and streaks
          commits.forEach(cm => {
            const dateStr = cm.commit.author?.date?.slice(0, 10);
            if (!dates[dateStr]) dates[dateStr] = 0;
            dates[dateStr]++;
          });
          if (commits.length > maxCommits) {
            maxCommits = commits.length;
            topRepo = r.name;
          }
        } catch {}
      }
      // Most active day
      let mostActiveDay = "";
      let maxDayCommits = 0;
      for (let k in dates) if (dates[k] > maxDayCommits) { mostActiveDay = k; maxDayCommits = dates[k]; }
      // Calculate max streak (consecutive days)
      const daysSorted = Object.keys(dates).sort();
      let currStreak = 1, bestStreak = 1;
      for (let i = 1; i < daysSorted.length; ++i) {
        const prev = new Date(daysSorted[i-1]);
        const cur = new Date(daysSorted[i]);
        if ((cur - prev) / (1000*60*60*24) === 1) currStreak++;
        else currStreak = 1;
        if (currStreak > bestStreak) bestStreak = currStreak;
      }
      streak = bestStreak;
      setInsightsData({ loading: false, error: null, data: { mostActiveDay, topRepo, streak } });
      return { mostActiveDay, topRepo, streak };
    } catch (e) {
      setInsightsData({ loading: false, error: e.message, data: null });
      return null;
    }
  }, [accessToken]);

  // Automated polling intervals (30s)
  useEffect(() => {
    if (!accessToken) { clearPolls(); return; }
    fetchRepos();
    fetchRecentCommits();
    fetchInsights();
    // polling
    pollingRef.current.repos = setInterval(fetchRepos, 60000); // 60s
    pollingRef.current.commits = setInterval(fetchRecentCommits, 45000); // 45s
    pollingRef.current.insights = setInterval(fetchInsights, 90000); // 90s

    function clearPolls() {
      Object.values(pollingRef.current).forEach(id => clearInterval(id));
      pollingRef.current = {};
    }
    return clearPolls;
    // eslint-disable-next-line
  }, [user, accessToken]);

  // == API to expose to children ==
  const api = {
    user, accessToken,
    refetchRepos: fetchRepos,
    refetchCommits: fetchRecentCommits,
    refetchInsights: fetchInsights,
    repoData,
    commitsData,
    insightsData,
  };

  return (
    <GitHubContext.Provider value={api}>
      {children}
    </GitHubContext.Provider>
  );
}

// PUBLIC_INTERFACE
export const useGitHub = () => useContext(GitHubContext);

>>>>>>> REPLACE
