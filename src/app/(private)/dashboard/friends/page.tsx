"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";

type FriendReq = {
  id: number;
  from_user: { id: number; username: string } | null;
  to_user: { id: number; username: string } | null;
  status: string;
};

type Friend = { id: number; username: string };

export default function FriendsPage() {
  const [requests, setRequests] = useState<FriendReq[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      const [reqs, frs] = await Promise.all([
        API.get("/friends/requests/mine/"),
        API.get("/friends/"),
      ]);
      setRequests(reqs.data || []);
      setFriends(frs.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const act = (id: number, action: "accept" | "reject") =>
    API.post(`/friends/requests/${id}/${action}/`).then(reload);

  return (
    <div className="px-6 sm:px-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        <section className="bg-[var(--card)] rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-2">Amigos</h1>
          <p className="text-sm text-gray-400 mb-6">
            Gestiona solicitudes y consulta tu lista de amigos.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Solicitudes</h2>
              <div className="space-y-3">
                {loading && <p className="text-sm text-gray-400">Cargando…</p>}
                {!loading && requests.length === 0 && (
                  <p className="text-sm text-gray-400">No hay solicitudes pendientes.</p>
                )}
                {requests.map((req) => (
                  <div key={req.id} className="flex items-center justify-between bg-black/20 rounded-xl p-4">
                    <div className="text-sm">
                      {req.from_user?.username} → {req.to_user?.username} ({req.status})
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-primary" onClick={() => act(req.id, "accept")}>
                        Aceptar
                      </button>
                      <button className="btn-ghost" onClick={() => act(req.id, "reject")}>
                        Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Tu lista</h2>
              {loading && <p className="text-sm text-gray-400">Cargando…</p>}
              {!loading && friends.length === 0 && (
                <p className="text-sm text-gray-400">Aún no tienes amigos.</p>
              )}
              <ul className="grid sm:grid-cols-2 gap-3">
                {friends.map((f) => (
                  <li key={f.id} className="bg-black/20 rounded-xl p-4">{f.username}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
