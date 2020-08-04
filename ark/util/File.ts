import * as fs from "fs";
import PathResolver from "./PathResolver";

export enum Encoding {
    ASCII,
    Base64,
    Binary,
    Hex,
    Latin1,
    UCS2,
    UTF8,
    UTF16LE,

}

export default class File {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    read(encoding: Encoding = Encoding.UTF8): string {
        return fs.readFileSync(this.path, {encoding: Encoding[encoding].toString().toLowerCase() as BufferEncoding});
    }

    write(content: string, encoding: Encoding = Encoding.UTF8): void {
        fs.writeFileSync(this.path, content, {encoding: Encoding[encoding].toString().toLowerCase() as BufferEncoding})
    }

    append(content: string, encoding: Encoding = Encoding.UTF8): void {
        fs.appendFileSync(this.path, content, {encoding: Encoding[encoding].toString().toLowerCase() as BufferEncoding})
    }

    getPath(): string {
        return this.path;
    }
}
