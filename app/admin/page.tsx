"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Role = "user" | "admin"
type UserRow = { id: string; username: string; email: string; role: Role; coins: number; createdAt: string }

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState("Usuarios")
  const [rows, setRows] = useState<UserRow[]>([])
  const [q, setQ] = useState("")

  const load = async () => {
    const { data } = await supabase.from("users").select("id,username,email,role,coins,createdAt").order("createdAt", { ascending: false })
    setRows((data as UserRow[]) || [])
  }

  useEffect(() => {
    if (!user) return router.push("/login")
    if (user.role !== "admin") return router.push("/")
    load()
  }, [user, router])

  const filtered = useMemo(() => rows.filter((r) => r.username.toLowerCase().includes(q.toLowerCase()) || r.email.toLowerCase().includes(q.toLowerCase())), [rows, q])

  const saveUser = async (payload: Partial<UserRow> & { username: string; email: string; role: Role; coins: number }, id?: string) => {
    if (id) await supabase.from("users").update(payload).eq("id", id)
    else await supabase.from("users").insert(payload)
    await load()
  }

  const removeUser = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return
    await supabase.from("users").delete().eq("id", id)
    await load()
  }

  if (!user || user.role !== "admin") return null

  return <section className="container mx-auto px-4 py-8 grid grid-cols-12 gap-6">
    <aside className="col-span-12 md:col-span-3 space-y-2">
      {["Usuarios", "Noticias", "Tienda"].map((item) => <Button key={item} variant={tab === item ? "default" : "outline"} className="w-full justify-start" onClick={() => setTab(item)}>{item}</Button>)}
    </aside>
    <div className="col-span-12 md:col-span-9">
      {tab !== "Usuarios" ? <p className="text-muted-foreground">Módulo en construcción.</p> : <UsersModule rows={filtered} onSave={saveUser} onDelete={removeUser} query={q} onQuery={setQ} />}
    </div>
  </section>
}

function UsersModule({ rows, onSave, onDelete, query, onQuery }: { rows: UserRow[]; onSave: (data: { username: string; email: string; role: Role; coins: number }, id?: string) => Promise<void>; onDelete: (id: string) => Promise<void>; query: string; onQuery: (q: string) => void }) {
  const [form, setForm] = useState({ username: "", email: "", role: "user" as Role, coins: 0 })
  const [editingId, setEditingId] = useState<string | undefined>(undefined)

  return <div className="space-y-4">
    <div className="flex gap-2"><Input placeholder="Buscar usuario/correo" value={query} onChange={(e) => onQuery(e.target.value)} /></div>
    <form className="grid md:grid-cols-4 gap-2" onSubmit={async (e) => { e.preventDefault(); if (!confirm(editingId ? "¿Confirmas editar usuario?" : "¿Confirmas crear usuario?")) return; await onSave(form, editingId); setForm({ username: "", email: "", role: "user", coins: 0 }); setEditingId(undefined) }}>
      <Input placeholder="Usuario" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <Input placeholder="Correo" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input placeholder="Monedas" required type="number" min={0} value={form.coins} onChange={(e) => setForm({ ...form, coins: Number(e.target.value) })} />
      <Select value={form.role} onValueChange={(value: Role) => setForm({ ...form, role: value })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="user">user</SelectItem><SelectItem value="admin">admin</SelectItem></SelectContent></Select>
      <Button type="submit">{editingId ? "Guardar cambios" : "Agregar"}</Button>
    </form>
    <div className="overflow-auto border rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-muted"><tr><th className="p-2 text-left">Acción</th><th className="p-2 text-left">ID</th><th className="p-2 text-left">Monedas</th><th className="p-2 text-left">Usuario</th><th className="p-2 text-left">Correo</th><th className="p-2 text-left">Rol</th><th className="p-2 text-left">Creado</th></tr></thead>
        <tbody>{rows.map((row) => <tr key={row.id} className="border-t"><td className="p-2 space-x-2"><Button size="sm" variant="outline" onClick={() => { setEditingId(row.id); setForm({ username: row.username, email: row.email, role: row.role, coins: row.coins }) }}>Editar</Button><Button size="sm" variant="destructive" onClick={() => onDelete(row.id)}>Eliminar</Button></td><td className="p-2">{row.id}</td><td className="p-2">{row.coins}</td><td className="p-2">{row.username}</td><td className="p-2">{row.email}</td><td className="p-2">{row.role}</td><td className="p-2">{new Date(row.createdAt).toLocaleString()}</td></tr>)}</tbody>
      </table>
    </div>
  </div>
}
