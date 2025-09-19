import React from 'react';

/**
 * Header with brand, search, actions, and theme toggle.
 * Props:
 * - theme: 'light' | 'dark'
 * - onToggleTheme(): void
 * - search: string
 * - onSearch(v: string): void
 * - onNewNote(): void
 * - onClearFilters(): void
 */
// PUBLIC_INTERFACE
export default function Header({
  theme,
  onToggleTheme,
  search,
  onSearch,
  onNewNote,
  onClearFilters,
}) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-logo" aria-hidden />
          <div>
            <div className="brand-title">Notes Manager</div>
            <div className="brand-sub">Ocean Professional</div>
          </div>
        </div>
        <div className="header-actions">
          <div className="search" role="search">
            <span className="icon">🔎</span>
            <input
              aria-label="Search notes"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button className="btn" onClick={onClearFilters} aria-label="Clear filters">
            Clear
          </button>
          <button className="btn btn-primary" onClick={onNewNote} aria-label="Create new note">
            + New Note
          </button>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}
