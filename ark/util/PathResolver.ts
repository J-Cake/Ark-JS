import * as os from "os";

export enum Type {
    Windows,
    Unix
}

export enum Drive {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z
}

export interface Options {
    root: string,
    pathType: Type
}

export default class PathResolver {
    config: Options;

    constructor(config: Options) {
        this.config = config;
    }

    join(path?: string[], ...paths: string[]): string {
        if (path instanceof Array)
            return this.clean(path.join('/'));

        if (paths instanceof Array && paths.length > 0)
            return this.clean(paths.join('/'));
    }

    toUnix(path: string): string {
        const _path: string[] = Array.from(this.clean(path));

        if (_path[1] === ":")
            _path.splice(0, 1, "/");

        return _path.join("/").replace("\\", '/');
    }

    toWindows(path: string, drive: Drive = Drive.C) {
        const _path: string[] = Array.from(this.clean(path));

        if (_path[0] === "/")
            _path.splice(0, 0, drive.toString().toUpperCase(), ":");

        return _path.join("\\").replace("/", "\\");
    }

    clean(path: string): string {
        const segments: string[] = path.split(/[\/\\]/g);

        const resolve: string[] = [];

        for (const segment of segments)
            if (segment === "..")
                resolve.pop();
            else if (segment === "~" && resolve.length === 0)
                resolve.push(os.homedir());
            else if (segment === "$" && resolve.length === 0)
                resolve.push(this.config.root);
            else if (segment !== ".")
                resolve.push(segment);

        return resolve.join("/");
    }
}
