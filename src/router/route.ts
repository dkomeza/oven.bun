import { Callback } from "./router";

export default class Route {
  private path: string;
  private regex: string;
  priority: number[];
  placeholders: string[] = [];

  get: Callback | undefined;
  post: Callback | undefined;
  put: Callback | undefined;
  delete: Callback | undefined;

  constructor(path: string, regex: string, priority: number[]) {
    this.path = path;
    this.regex = regex;
    this.priority = priority;
    this.placeholders = this.parsePlaceholders(path);
  }

  public match(path: string, method: string): boolean {
    const regex = new RegExp(this.regex);

    if (!regex.test(path)) {
      return false;
    }

    switch (method) {
      case "GET":
        return this.get !== undefined;
      case "POST":
        return this.post !== undefined;
      case "PUT":
        return this.put !== undefined;
      case "DELETE":
        return this.delete !== undefined;
    }

    return false;
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
