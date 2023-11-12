import { test, expect, afterEach } from "bun:test";
import Oven from "..";

test("Oven should be a class", () => {
  expect(Oven).toBeInstanceOf(Function);
});

test("Oven should have a stop method", async () => {
  const oven = new Oven();
  expect(oven.stop).toBeInstanceOf(Function);
  oven.stop();
});

test("Oven should have a constructor", () => {
  expect(Oven.constructor).toBeInstanceOf(Function);
});

test("Stop should stop the server", () => {
  const oven = new Oven();
  oven.stop();

  expect(oven.stop).toThrow();
});
