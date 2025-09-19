import React from 'react';

/**
 * Sidebar tag filter.
 * Props:
 * - tags: string[] (includes 'All' as first)
 * - activeTag: string
 * - onSelectTag(tag: string): void
 */
// PUBLIC_INTERFACE
export default function Sidebar({ tags, activeTag, onSelectTag }) {
  return (
    <div>
      <h3>Tags</h3>
      <div>
        {tags.map((t) => (
          <button
            key={t}
            className={`tag ${activeTag === t ? 'active' : ''}`}
            onClick={() => onSelectTag(t)}
            aria-pressed={activeTag === t}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
