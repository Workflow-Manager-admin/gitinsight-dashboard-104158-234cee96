import React from "react";

// PUBLIC_INTERFACE
export default function TopBar({ user, onSignIn, onSignOut }) {
  return (
    <header className="topbar">
      <span className="topbar-logo">
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#2b9c47",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            marginRight: 10,
            fontWeight: 900,
          }}
        >
          G
        </span>{" "}
        GitInsight Dashboard
      </span>
      <div>
        {!user ? (
          <button className="btn" style={{ background: "#24292e" }} onClick={onSignIn}>
            Sign in with Git Account
          </button>
        ) : (
          <UserProfileMenu user={user} onSignOut={onSignOut} />
        )}
      </div>
    </header>
  );
}

// PUBLIC_INTERFACE
function UserProfileMenu({ user, onSignOut }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <img
        src={user.avatar}
        alt="profile"
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "2.5px solid #28a745",
          objectFit: "cover",
        }}
      />
      <span style={{ fontWeight: 600, color: "#24292e", marginRight: 14 }}>
        {user.name}
      </span>
      <button
        className="btn"
        style={{
          background: "#2b9c47",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          padding: "6px 16px",
        }}
        onClick={onSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
