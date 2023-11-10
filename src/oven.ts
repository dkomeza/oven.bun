import { Server } from "bun";

interface OvenInterface {
    port?: number;

}

class Oven {
    private server: Server;

    constructor(params: OvenInterface = {}) {
        this.server = Bun.serve({
            port: params.port || 5000,
            fetch: this.handle
        })
    }

    private async handle(request: Request, server: Server): Promise<Response> {
        return new Response("Hello via Bun!");
    }
}

export default Oven;