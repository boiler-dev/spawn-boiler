import { spawn as ptySpawn } from "node-pty"

export interface SpawnOutput {
  code: number
  out: string
  signal: number
}

export interface SpawnOptions {
  args?: string[]
  cwd?: string
  env?: Record<string, string>
}

class Spawn {
  async run(
    command: string,
    options: SpawnOptions = {}
  ): Promise<SpawnOutput> {
    const { args = [], cwd, env } = options

    const cols = process.stdout.columns
    const rows = process.stdout.rows

    const pty = ptySpawn(command, args, {
      cols,
      cwd,
      env,
      name: "xterm-color",
      rows,
    })

    let out = ""

    pty.on("data", (data): void => {
      out += data
    })

    return new Promise((resolve): void => {
      pty.on("exit", (code, signal): void =>
        resolve({ code, out, signal })
      )
    })
  }
}

export default new Spawn()
