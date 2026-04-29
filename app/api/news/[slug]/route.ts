import { supabase } from "@/lib/supabase/client"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    )
  }
}
