"use client";

import React, { useEffect, useState } from "react";
import { Friends } from "@/lib/friends";
import API from "@/lib/api";

type Friend = {
  id: number;
  friend: { id: number; username: string; email: string };
  created_at: string;
};

type Page<T> = { results: T[]; next?: string | null; previous?: string | null };

export default function FriendsList() {
  const [data, setData] = useState<Page<Friend> | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(url?: string) {
    setLoading(true);
    try {
      const res = url ? await API.get(url) : await Friends.list({ page_size: 20 });
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onUnfriend(userId: number) {
    await Friends.unfriend(userId);
    await load();
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Amigos</h2>
        <button className="px-3 py-1.5 rounded bg-gray-100" onClick={() => load()}>
          Refrescar
        </button>
      </div>
      {loading && <p>Cargando…</p>}
      <ul className="divide-y border rounded">
        {(data?.results || []).map((f) => (
          <li key={f.id} className="p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{f.friend.username}</div>
              <div className="text-xs text-gray-500">{f.friend.email}</div>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 rounded bg-rose-100 hover:bg-rose-200"
                onClick={() => onUnfriend(f.friend.id)}
              >
                Eliminar
              </button>
              <button
                className="px-3 py-1.5 rounded bg-gray-100"
                onClick={() => Friends.block(f.friend.id).then(() => load())}
              >
                Bloquear
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        {data?.previous && (
          <button
            className="px-3 py-1.5 rounded bg-gray-100"
            onClick={() => load(data.previous!)}
          >
            Anterior
          </button>
        )}
        {data?.next && (
          <button className="px-3 py-1.5 rounded bg-gray-100" onClick={() => load(data.next!)}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
