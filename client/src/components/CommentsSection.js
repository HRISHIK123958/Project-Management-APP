// src/components/CommentsSection.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CommentsSection({ ticketId, token }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  // Fetch comments for this ticket
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/comments/ticket/${ticketId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(res.data);
    } catch (err) {
      console.error('Load comments failed', err);
    }
  };

  // CORRECTED: invoke fetchComments inside an arrow effect,
  // so the effect returns undefined (no cleanup), not a Promise.
  useEffect(() => {
    fetchComments();
  }, [ticketId]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/comments`,
        { ticketId, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText('');
      fetchComments();
    } catch (err) {
      console.error('Post comment failed', err);
    }
  };

  return (
    <div className="mt-4 border-t pt-3">
      <h5 className="text-sm font-semibold mb-2">Comments</h5>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {comments.map(c => (
          <div key={c._id} className="text-xs">
            <span className="font-medium">{c.userId.name}:</span>{' '}
            <span>{c.text}</span>
            <div className="text-gray-400 text-[10px]">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Post
        </button>
      </form>
    </div>
  );
}
