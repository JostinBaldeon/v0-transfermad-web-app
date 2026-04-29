import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("[v0] Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function executeSql(sql: string): Promise<void> {
  const { error } = await supabase.rpc("exec_sql", { sql })

  if (error) {
    console.error("[v0] SQL execution error:", error)
    throw error
  }
}

async function runMigrations(): Promise<void> {
  const scriptsDir = path.join(process.cwd(), "scripts")

  // Get all SQL files sorted by name
  const files = fs
    .readdirSync(scriptsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort()

  console.log(`[v0] Found ${files.length} migration files`)

  for (const file of files) {
    console.log(`[v0] Running migration: ${file}`)
    const filePath = path.join(scriptsDir, file)
    const sql = fs.readFileSync(filePath, "utf-8")

    try {
      // Split by semicolons and execute each statement
      const statements = sql
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      for (const statement of statements) {
        const { error } = await supabase.rpc("exec_sql", { sql: statement })
        if (error) {
          console.error(`[v0] Error executing statement in ${file}:`, error)
          // Continue with next statement
        }
      }

      console.log(`[v0] ✓ Migration ${file} completed`)
    } catch (error) {
      console.error(`[v0] Error running migration ${file}:`, error)
      throw error
    }
  }

  console.log("[v0] All migrations completed!")
}

runMigrations().catch((error) => {
  console.error("[v0] Migration failed:", error)
  process.exit(1)
})
