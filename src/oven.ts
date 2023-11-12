import { Server } from "bun";

interface OvenInterface {
  port?: number;
}

class Oven {
  private server: Server;

  /**
   * Creates a new Oven instance and starts the server.
   * @param params Oven parameters.
   * @param params.port Port to listen on (default: 5000).
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
