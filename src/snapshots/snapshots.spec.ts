import { describe, expect, it } from "vitest";
import { toUpperCase } from "./snapshots";

describe("snapshots", () => {
  it("toUpperCase", () => {
    const result = toUpperCase("foobar");
    expect(result).toMatchSnapshot();
  });

  it("toUpperCase", () => {
    const result = toUpperCase("foobar");
    expect(result).toMatchInlineSnapshot('"FOOBAR"');
  });
});
