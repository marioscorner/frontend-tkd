// src/app/health/page.tsx
"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { wsUrl } from "@/lib/ws";

export default function HealthPage(){
  const [http,setHttp] = useState("checking...");
  const [ws,setWs] = useState("connecting...");
  useEffect(()=>{
    API.get("/health/").then(r=>setHttp(JSON.stringify(r.data))).catch(e=>setHttp(String(e)));
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
    const sock = new WebSocket(wsUrl("/ws/health/", token || undefined));
    sock.onmessage = (m)=> setWs(m.data);
    sock.onerror = ()=> setWs("error");
    return ()=> sock.close();
  },[]);
  return (
    <div className="px-6 sm:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-[var(--card)] rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Health</h1>
          <div className="space-y-2 text-sm">
            <div><span className="text-gray-400">HTTP:</span> {http}</div>
            <div><span className="text-gray-400">WS:</span> {ws}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
