import React, { useMemo } from 'react';
import { formatDistanceToNow } from '../lib/time';

/**
 * Notes list component.
 * Props:
 * - notes: Note[]
 * - selectedId: string | null
 * - onSelect(id: string): void
 * - onDelete(id: string): void
 * - onTogglePin(id: string): void
 *
 * Note model:
 * { id, title, content, tags: string[], pinned: boolean, updatedAt: number, createdAt: number }
 */
// PUBLIC_INTERFACE
export default function NotesList({ notes, selectedId, onSelect, onDelete, onTogglePin }) {
  const grouped = useMemo(() => {
    const pinned = notes.filter(n => n.pinned);
    const others = notes.filter(n => !n.pinned);
    return { pinned, others };
  }, [notes]);

  const renderRow = (n) => (
    <article
      key={n.id}
      className={`card ${selectedId === n.id ? 'selected' : ''}`}
      onClick={() => onSelect(n.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(n.id)}
      aria-pressed={selectedId === n.id}
    >
      <div className="card-title">
        {n.title || 'Untitled'}
      </div>
      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
        <button className="btn btn-ghost" title="Pin / Unpin" onClick={() => onTogglePin(n.id)}>
          {n.pinned ? '📌' : '📍'}
        </button>
        <button className="btn" title="Delete note" onClick={() => onDelete(n.id)}>
          🗑️
        </button>
      </div>
      <div className="card-meta">
        {n.tags?.length ? `#${n.tags.slice(0, 3).join(' #')}` : 'No tags'}
        {' · '}
        {formatDistanceToNow(n.updatedAt)} ago
      </div>
    </article>
  );

  return (
    <div className="list">
      <div className="list-header">
        <strong>Notes</strong>
        <span style={{ color: 'var(--muted)' }}>{notes.length} total</span>
      </div>
      {grouped.pinned.length > 0 && (
        <>
          <div className="list-header"><span>Pinned</span></div>
          {grouped.pinned.map(renderRow)}
          <div className="list-header"><span>Others</span></div>
        </>
      )}
      {grouped.others.map(renderRow)}
      {notes.length === 0 && (
        <div className="empty-state">
          No notes yet. Click “+ New Note” to get started.
        </div>
      )}
    </div>
  );
}
