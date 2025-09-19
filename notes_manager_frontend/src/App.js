import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './ocean.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import EditorPane from './components/EditorPane';
import {
  createEmptyNote,
  filterNotesByQueryAndTag,
  loadNotesFromStorage,
  persistNotesToStorage,
  upsertNote,
  deleteNoteById,
  togglePinById,
  uniqueTagsFromNotes,
} from './lib/notesUtils';

/**
 * Root application shell for Notes Manager.
 * Provides layout: Header, Sidebar (tags), Main (notes list + editor).
 * Uses localStorage for persistence. No external APIs required.
 */
// PUBLIC_INTERFACE
function App() {
  // Theme handling (light/dark)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Notes state and selection
  const [notes, setNotes] = useState(() => loadNotesFromStorage());
  const [selectedId, setSelectedId] = useState(() => {
    const saved = localStorage.getItem('selectedId');
    return saved || null;
  });

  // Filters
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');

  // Persist notes on change
  useEffect(() => {
    persistNotesToStorage(notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('selectedId', selectedId || '');
  }, [selectedId]);

  const allTags = useMemo(() => ['All', ...uniqueTagsFromNotes(notes)], [notes]);

  const filteredNotes = useMemo(
    () => filterNotesByQueryAndTag(notes, search, activeTag),
    [notes, search, activeTag]
  );

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  // PUBLIC_INTERFACE
  const handleCreateNote = () => {
    const newNote = createEmptyNote();
    const nextNotes = upsertNote(notes, newNote);
    setNotes(nextNotes);
    setSelectedId(newNote.id);
  };

  // PUBLIC_INTERFACE
  const handleSelectNote = (id) => {
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  const handleUpdateNote = (updated) => {
    setNotes(prev => upsertNote(prev, updated));
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = (id) => {
    setNotes(prev => deleteNoteById(prev, id));
    if (selectedId === id) setSelectedId(null);
  };

  // PUBLIC_INTERFACE
  const handleTogglePin = (id) => {
    setNotes(prev => togglePinById(prev, id));
  };

  // PUBLIC_INTERFACE
  const handleClearFilters = () => {
    setActiveTag('All');
    setSearch('');
  };

  return (
    <div className="app-root ocean-bg">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
        search={search}
        onSearch={setSearch}
        onNewNote={handleCreateNote}
        onClearFilters={handleClearFilters}
      />
      <div className="layout">
        <aside className="sidebar">
          <Sidebar
            tags={allTags}
            activeTag={activeTag}
            onSelectTag={setActiveTag}
          />
        </aside>
        <main className="main">
          <section className="notes-list-pane">
            <NotesList
              notes={filteredNotes}
              selectedId={selectedId}
              onSelect={handleSelectNote}
              onDelete={handleDeleteNote}
              onTogglePin={handleTogglePin}
            />
          </section>
          <section className="editor-pane">
            <EditorPane
              note={selectedNote}
              onChange={handleUpdateNote}
              onDelete={() => selectedNote && handleDeleteNote(selectedNote.id)}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
