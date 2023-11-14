import { Server } from "bun";
import Router, { Callback } from "./router/router";

interface OvenInterface {
  port?: number;
  router?: boolean;
}

class Oven {
  private server: Server;
  private router: Router | undefined;

  /**
   * Creates a new Oven instance and starts the server.
   * @param params Oven parameters.
   * @param params.port Port to listen on (default: 5000).
   * @param params.router Enable router (default: true).
   * @returns Oven instance.
   * @example
   * const oven = new Oven({ port: 5000 });
   * @example
   * const oven = new Oven();
   */
  constructor(params: OvenInterface = {}) {
    this.server = Bun.serve({
      port: params.port || 5000,
      fetch: this.handle,
    });

    if (params.router !== false) {
      this.router = new Router();
    }
  }

  /**
   *  Registers a GET route.
   * @param path Path to register. Supports parameters and wildcards.
   * @param callback Callback to execute when the route is requested.
   * @example
   * oven.get("/", (req) => new Response("Hello World!"));
   * @example
   * oven.get("/:name", (req) => new Response(`Hello ${req.params.name}!`));
   * @example
   * oven.get("/hello/*", (req) => new Response(`Hello World!`));
   */
  public get(path: string, callback: Callback): void {
    if (!this.router) {
      throw new Error("Router is not enabled.");
    }

    this.router.get(path, callback);
  }

  /**
   * Stops the server.
   * @example
   * oven.stop();
   */
  public stop(): void {
    this.server.stop(true);
  }

  private async handle(request: Request, server: Server): Promise<Response> {
    return new Response("Hello via Bun!");
  }
}

export default Oven;
