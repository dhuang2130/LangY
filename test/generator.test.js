import assert from "node:assert/strict";
import parse from "../src/parser.js";
import analyze from "../src/analyzer.js";
import generate from "../src/generator.js";

// Dedent function helps to remove the indentation of template literals for better readability and comparison
function dedent(s) {
  return `${s}`.replace(/(?<=\n)\s+/g, "").trim();
}

const fixtures = [
  {
    name: "variable declaration",
    source: `
      make x : 10;
      print(x);
    `,
    expected: dedent`
      make x_1 : 10;
      console.log(x_1);
    `,
  },
  {
    name: "while loop",
    source: `
      make x : 0;
      whileLoop (x < 5) {
        print(x);
        x : x + 1;
      }
    `,
    expected: dedent`
      make x_1 : 0;
      whileLoop (x_1 < 5) {
        console.log(x_1);
        x_1 : (x_1 + 1);
      }
    `,
  },
  {
    name: "function CALL",
    source: `
      function gcd(x, y): y == 0 ? x : gcd(y, x % y);
      print gcd(22, 33);
    `,
    expected: dedent`
      function gcd_3(x_1, y_2) {
        return (((y_2 == 0)) ? (x_1) : (gcd_3(y_2,(x_1 % y_2))));
      }
      console.log(gcd_3(22,33));
    `,
  },
  {
    name: "complex expression",
    source: `
      make x : (1 + (2 * 3));
      print(x);
    `,
    expected: dedent`
      make x_1 : (1 + (2 * 3));
      console.log(x_1);
    `,
  }
];

describe("The code generator", () => {
  for (const fixture of fixtures) {
    it(`produces expected js output for the ${fixture.name} program`, () => {
      const actual = generate(analyze(parse(fixture.source)));
      assert.strictEqual(actual, fixture.expected);
    });
  }
});
