import { camelize } from "../mod.ts";
import {
  assert,
  fail,
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
Deno.test("Camelize Test", () => {
  assertEquals(camelize("foo_bar"), "fooBar");
});

Deno.test("It Doesn't  touch strings in array", () => {
  assertEquals(camelize(["foo_bar"]), ["foo_bar"]);
});

Deno.test("It Doesn't Touch Dates and Regular Expressions", () => {
  const regex = new RegExp(/./);
  const date = new Date();
  assertEquals(
    camelize({
      name: "Phantom",
      date,
      regex,
    }),
    {
      name: "Phantom",
      date,
      regex,
    }
  );
});

Deno.test("It Works", () => {
  assertEquals(
    camelize({
      a_name: "a",
    }),
    { aName: "a" }
  );
});

Deno.test("It Works with nested objects", () => {
  assertEquals(
    camelize({
      a_name: "a",
      nested: {
        b_name: "b",
      },
      names: ["a_name", "b_name"],
      name: [
        {
          a_name: "a",
        },
      ],
    }),
    {
      aName: "a",
      nested: {
        bName: "b",
      },
      names: ["a_name", "b_name"],
      name: [
        {
          aName: "a",
        },
      ],
    }
  );
});

Deno.test("Case Remains Intact", () => {
  assertEquals(
    camelize({
      a_NAME: "a",
      a_name: "b",
    }),
    {
      aNAME: "a",
      aName: "b",
    }
  );
});
