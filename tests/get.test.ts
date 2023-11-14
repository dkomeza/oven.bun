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

  oven.stop();
});

test("Should handle GET requests with parameters", async () => {
  const oven = new Oven();

  oven.get("/:name", (req) => {
    return new Response(`Hello World!`);
  });

  const response = await fetch("http://localhost:5000/World");
  const text = await response.text();

  expect(text).toBe("Hello World!");

  oven.stop();
});

test("Should handle GET requests with wildcards", async () => {
  const oven = new Oven();

  oven.get("/hello/*", (req) => {
    return new Response(`Hello World!`);
  });

  const response = await fetch("http://localhost:5000/hello/world");
  const text = await response.text();

  expect(text).toBe("Hello World!");

  oven.stop();
});

test("Should throw a 404 on non-existing routes", async () => {
  const oven = new Oven();

  oven.get("/", (req) => {
    return new Response("Hello World!");
  });

  const response = await fetch("http://localhost:5000/404");
  const text = await response.text();

  expect(text).toBe("Not found");

  oven.stop();
});

test("Should prioritize strict routes over wildcards", async () => {
  const oven = new Oven();

  oven.get("/hello/world", (req) => {
    return new Response("Hello World!");
  });

  oven.get("/hello/*", (req) => {
    return new Response("Hello Wildcard!");
  });

  const response = await fetch("http://localhost:5000/hello/world");
  const text = await response.text();

  expect(text).toBe("Hello World!");

  oven.stop();
});
