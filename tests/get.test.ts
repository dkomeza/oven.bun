import { test, expect } from "bun:test";
import Oven from "..";

test("Should handle GET requests", async () => {
  const oven = new Oven();

  oven.get("/", (req) => {
    return new Response("Hello World!");
  });

  const response = await fetch("http://localhost:5000/");
  const text = await response.text();

  expect(text).toBe("Hello World!");
});
