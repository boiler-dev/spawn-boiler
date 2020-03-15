import {
  ActionBoiler,
  PromptBoiler,
  BoilerAction,
  BoilerPrompt,
} from "boiler-dev"

export const install: ActionBoiler = async ({
  allAnswers,
}) => {
  const actions: BoilerAction[] = []

  actions.push({
    action: "npmInstall",
    source: ["node-pty"],
  })

  return actions
}

export const uninstall: ActionBoiler = async () => {
  const actions: BoilerAction[] = []

  actions.push({
    action: "npmInstall",
    source: ["node-pty"],
    uninstall: true,
  })

  return actions
}

export const generate: ActionBoiler = async () => {
  const actions: BoilerAction[] = []

  actions.push({
    action: "write",
    path: "src/spawn.ts",
    sourcePath: "tsignore/spawn.ts",
  })

  actions.push({
    action: "write",
    path: "test/spawn.spec.ts",
    sourcePath: "tsignore/spawn.spec.ts",
  })

  return actions
}

export const absorb: ActionBoiler = async ({ writes }) => {
  return writes.map(({ path, sourcePath }) => ({
    action: "write",
    sourcePath: path,
    path: sourcePath,
    // modify: (src: string): string => src,
  }))
}
