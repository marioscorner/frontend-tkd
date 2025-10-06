"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ProfilePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Columna izquierda - Calendario */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-4">Calendario</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      {/* Columna derecha - Tarjetas de navegación */}
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Amigos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">Gestiona y conecta con tus amigos.</p>
            <Link href="/dashboard/amigos" className="text-blue-600 hover:underline">
              Ir a Amigos →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">Habla con tus compañeros.</p>
            <Link href="/dashboard/chats" className="text-blue-600 hover:underline">
              Ir a Chats →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Temario</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">Accede al material de aprendizaje.</p>
            <Link href="/dashboard/temario" className="text-blue-600 hover:underline">
              Ir a Temario →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}