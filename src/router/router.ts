type Callback = (req: Request) => Response | Promise<Response>;

class Router {
    routes: { [key: string]: any } = {};
}