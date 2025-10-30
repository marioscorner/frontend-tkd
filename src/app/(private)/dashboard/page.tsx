import Link from "next/link";

export const metadata = {
  title: "Panel | Taekwondo",
};

export default function DashboardHome() {
  return (
    <div className="px-6 sm:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-[var(--card)] rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-2">Panel</h1>
          <p className="text-sm text-gray-400 mb-6">
            Bienvenido al área privada. Elige una sección:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/dashboard/chats" className="btn-ghost">Chats</Link>
            <Link href="/dashboard/friends" className="btn-ghost">Amigos</Link>
            <Link href="/dashboard/friends/blocked" className="btn-ghost">Bloqueados</Link>
            <Link href="/docs" className="btn-ghost">Documentación</Link>
            <Link href="/dashboard/profile" className="btn-ghost">Perfil</Link>
            <Link href="/health" className="btn-ghost">Health</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
