import Route from "./route";

type Callback = (req: Request) => Response | Promise<Response>;

class Router {
  private routes: { [key: string]: Route } = {};

  public async handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const routes = Object.values(this.routes).filter((route) =>
      route.match(path, method)
    );

    const route = this.handlePriority(routes);

    if (route) {
      let callback: Callback = () => new Response("Not found", { status: 404 });

      switch (method) {
        case "GET":
          callback = route.get!;
          break;
        case "POST":
          callback = route.post!;
          break;
        case "PUT":
          callback = route.put!;
          break;
        case "DELETE":
          callback = route.delete!;
          break;
      }

      return await callback(request);
    }

    return new Response("Not found", {
      status: 404,
    });
  }

  public get(path: string, callback: Callback): void {
    const { regex, priority } = this.createRegex(path);

    if (this.routes[regex]) {
      this.routes[regex].get = callback;
      return;
    }

    const route = new Route(path, regex, priority);
    route.get = callback;

    this.routes[regex] = route;
  }

  private createRegex(path: string): { regex: string; priority: number[] } {
    const pathArray = path.split("/").filter((item) => item !== "");

    if (pathArray.length === 0) {
      return { regex: "^/$", priority: [0] };
    }

    const priority: number[] = [];
    let regex = "^";

    pathArray.forEach((item, index) => {
      if (item.startsWith(":")) {
        regex += "\\/((?:[^/])+)";
        priority[index] = 1;
      } else if (item === "*") {
        regex += "\\/(\\S+)";
        priority[index] = 2;
      } else {
        regex += `\\/${item}`;
        priority[index] = 0;
      }
    });

    if (!path.endsWith("*")) {
      regex += "$";
    }

    return { regex, priority };
  }

  private handlePriority(
    routes: Route[],
    priorityIndex = 0
  ): Route | undefined {
    if (routes.length === 0) {
      return undefined;
    }

    if (routes.length === 1) {
      return routes[0];
    }

    if (priorityIndex >= routes[0].priority.length) {
      return routes[0];
    }

    routes.sort((a, b) => {
      if (a.priority[priorityIndex] > b.priority[priorityIndex]) {
        return 1;
      }

      if (a.priority[priorityIndex] < b.priority[priorityIndex]) {
        return -1;
      }

      return 0;
    });

    const highestPriority = routes[0].priority[priorityIndex];
    const highestPriorityRoutes = routes.filter(
      (route) => route.priority[priorityIndex] === highestPriority
    );

    return this.handlePriority(highestPriorityRoutes, priorityIndex + 1);
  }
}

export default Router;
export { Callback };
