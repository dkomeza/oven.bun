type Callback = (req: Request) => Response | Promise<Response>;

class Router {
    routes: { [key: string]: any } = {};

    private createRegex(path: string): { regex: string, priority: number[]} {
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
}