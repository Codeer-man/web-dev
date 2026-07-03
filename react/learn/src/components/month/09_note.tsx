import React, { useState } from "react";

type Note = {
  id: string;
  text: string;
  createdAt: string;
};

export default function Note() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editId, setEditId] = useState("");
  const [search, setSearch] = useState("");

  const filterNote = notes.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase()),
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (note.trim() === "") {
      return;
    }

    if (editId) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editId ? { ...n, text: note } : n)),
      );

      setEditId("");
    } else {
      setNotes((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: note,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
      setNote("");
    }
  }

  function handleEdit(id: string) {
    const selectedNote = notes.find((n) => n.id === id);

    if (!selectedNote) return;

    setNote(selectedNote.text);
    setEditId(id);
  }

  function handleDelete(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        Total Notes: {notes.length}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={note}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNote(e.target.value)
            }
          />
          <button type="submit">{editId ? "Edit note" : "Add note"}</button>
        </form>
        {notes && (
          <div>
            {filterNote.map((note, i) => (
              <div key={note.id}>
                {i + 1}.{note.text}{" "}
                <p>createdAt : {note.createdAt.toString()} </p>
                <button onClick={() => handleEdit(note.id)}>Edit</button>{" "}
                <button onClick={() => handleDelete(note.id)}>delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {/* search */}

        <p>Search</p>
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>
    </div>
  );
}
