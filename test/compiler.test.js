import * as assert from "node:assert";
import {compile} from "../src/LangY.js"

describe("Compiler", () => {
    it("should compile", () => {
        assert.equal(1+1, 2);
    });
});

describe("LangY", () => {
    it("should compile", () => {
        assert.equal(compile(), "eventually this will return the compiled code");
    });
});