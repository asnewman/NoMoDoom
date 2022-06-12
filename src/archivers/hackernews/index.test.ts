import archiveHackernews from "."

describe("test aaa", () => {
  jest.setTimeout(30000)
  it('wahh', async () => {
    await archiveHackernews()
    expect(true).toBe(true)
  })
})