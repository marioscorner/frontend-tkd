"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Friends } from "@/lib/friends";
import API from "@/lib/api";

type FriendReq = {
  id: number;
  from_user: { id: number; username: string; email: string };
  to_user: { id: number; username: string; email: string };
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";
  message?: string;
  created_at: string;
};

type Page<T> = { results: T[]; next?: string | null; previous?: string | null };
type Box = "incoming" | "outgoing" | "all";

export default function FriendRequests() {
  const [box, setBox] = useState<Box>("incoming");
  const [data, setData] = useState<Page<FriendReq> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (url?: string) => {
    setLoading(true);
    try {
      const res = url ? await API.get(url) : await Friends.mine(box, { page_size: 20 });
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }, [box]);

  useEffect(() => {
    load();
  }, [load]);

  async function onAccept(id: number) {
    await Friends.accept(id);
    await load();
  }
  async function onReject(id: number) {
    await Friends.reject(id);
    await load();
  }
  async function onCancel(id: number) {
    await Friends.cancel(id);
    await load();
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Solicitudes de amistad</h2>
        <div className="flex gap-2">
          {(["incoming", "outgoing", "all"] as Box[]).map((b) => (
            <button
              key={b}
              onClick={() => setBox(b)}
              className={`px-3 py-1.5 rounded ${
                box === b ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {b}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded bg-gray-100" onClick={() => load()}>
            Refrescar
          </button>
        </div>
      </div>
      {loading && <p>Cargando…</p>}
      <ul className="divide-y border rounded">
        {(data?.results || []).map((fr) => {
          const who = box === "outgoing" ? fr.to_user : fr.from_user;
          return (
            <li key={fr.id} className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{who.username}</div>
                <div className="text-xs text-gray-500">{who.email}</div>
                {fr.message && <div className="text-xs mt-1">“{fr.message}”</div>}
              </div>
              <div className="flex gap-2">
                {box === "incoming" && fr.status === "PENDING" && (
                  <>
                    <button
                      className="px-3 py-1.5 rounded bg-emerald-100 hover:bg-emerald-200"
                      onClick={() => onAccept(fr.id)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="px-3 py-1.5 rounded bg-rose-100 hover:bg-rose-200"
                      onClick={() => onReject(fr.id)}
                    >
                      Rechazar
                    </button>
                  </>
                )}
                {box === "outgoing" && fr.status === "PENDING" && (
                  <button
                    className="px-3 py-1.5 rounded bg-gray-100"
                    onClick={() => onCancel(fr.id)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </li>
          );
        })}
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
