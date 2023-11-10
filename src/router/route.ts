import { Callback } from "./router";

export default class Route {
  path: string;
  priority: number[];
  placeholders: string[] = [];

  get: Callback | undefined;
  post: Callback | undefined;
  put: Callback | undefined;
  delete: Callback | undefined;

  constructor(path: string, priority: number[]) {
    this.path = path;
    this.priority = priority;
    this.placeholders = this.parsePlaceholders(path);
  }

  private parsePlaceholders(path: string): string[] {
    const pathArray = path.split("/");
    const placeholders: string[] = [];

    for (let i = 0; i < pathArray.length; i++) {
      if (pathArray[i].startsWith(":")) {
        placeholders.push(pathArray[i].substring(1));
      }
    }

    return placeholders;
  }
}
