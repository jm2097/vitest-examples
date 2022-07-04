import { describe, expect, test } from "vitest";
import { mathFunctions } from "../math-functions";
import { stringFunctions } from "../string-functions";

describe("snapshots", () => {
  test("toUpperCase", () => {
    const result = stringFunctions.toUpperCase("foobar");
    expect(result).toMatchSnapshot();
    expect(result).toMatchInlineSnapshot('"FOOBAR"');
  });

  test("squareList", () => {
    const result = mathFunctions.squareList([1, 2, 3, 4, 5]);
    expect(result).matchSnapshot();
    expect(result).toMatchInlineSnapshot(`
      [
        1,
        4,
        9,
        16,
        25,
      ]
    `);
  });
});
