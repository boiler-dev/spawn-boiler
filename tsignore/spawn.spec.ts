import expect from "./expect"
import spawn from "../src/spawn"

describe("spawn", () => {
  it("runs", async () => {
    expect(
      await spawn.run("echo", { args: ["hi"] })
    ).toEqual({
      code: 0,
      out: "hi\r\n",
      signal: 0,
    })
  })
})
