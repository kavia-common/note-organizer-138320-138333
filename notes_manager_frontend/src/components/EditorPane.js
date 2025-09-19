import React, { useEffect, useState } from 'react';

/**
 * Editor pane for the selected note.
 * Props:
 * - note: Note | null
 * - onChange(updatedNote: Note): void
 * - onDelete(): void
 */
// PUBLIC_INTERFACE
export default function EditorPane({ note, onChange, onDelete }) {
  const [local, setLocal] = useState(() =>
    note || { title: '', content: '', tags: [], id: null }
  );

  useEffect(() => {
    setLocal(note || { title: '', content: '', tags: [], id: null });
  }, [note]);

  if (!note) {
    return (
      <div className="empty-state">
        Select a note from the list or create a new one.
      </div>
    );
  }

  const updateField = (field, value) => {
    const updated = { ...local, [field]: value, updatedAt: Date.now() };
    setLocal(updated);
    onChange(updated);
  };

  const handleTagsChange = (value) => {
    const parts = value
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    updateField('tags', parts);
  };

  return (
    <>
      <div className="editor-header">
        <input
          className="title-input"
          placeholder="Title"
          value={local.title}
          onChange={(e) => updateField('title', e.target.value)}
          aria-label="Note title"
        />
        <input
          className="tags-input"
          placeholder="Tags (comma separated)"
          value={local.tags?.join(', ') || ''}
          onChange={(e) => handleTagsChange(e.target.value)}
          aria-label="Note tags"
        />
        <button className="btn" onClick={onDelete} title="Delete note">
          🗑️ Delete
        </button>
      </div>
      <div className="content">
        <textarea
          placeholder="Start typing your note..."
          value={local.content}
          onChange={(e) => updateField('content', e.target.value)}
          aria-label="Note content"
        />
      </div>
    </>
  );
}
