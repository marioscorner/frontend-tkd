// src/components/friends/BlockedList.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Friends } from "@/lib/friends";
import API from "@/lib/api";

type Blocked = {
  id: number;
  blocked: { id: number; username: string; email: string };
  created_at: string;
};

type Page<T> = { results: T[]; next?: string | null; previous?: string | null };

export default function BlockedList() {
  const [data, setData] = useState<Page<Blocked> | null>(null);

  async function load(url?: string) {
    const res = url ? await API.get(url) : await Friends.blocked();
    setData(res.data);
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Usuarios bloqueados</h2>
      <ul className="divide-y border rounded">
        {(data?.results || []).map((b) => (
          <li key={b.id} className="p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{b.blocked.username}</div>
              <div className="text-xs text-gray-500">{b.blocked.email}</div>
            </div>
            <button
              className="px-3 py-1.5 rounded bg-gray-100"
              onClick={() => Friends.unblock(b.blocked.id).then(() => load())}
            >
              Desbloquear
            </button>
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
