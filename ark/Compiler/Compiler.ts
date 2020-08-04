import File from '../util/File';
import Lex from "./Lexer/Lexer";
import Token from './Lexer/Token';

export interface Options {

}

export default class Compiler {
    file: string;
    preferences: Options;

    constructor(file: string, preferences: Options) {
        if (file) {
            this.file = file;
            this.preferences = preferences;
        } else throw new TypeError("Invalid Path");
    }

    compile(): void {
        const file = new File(this.file)
        const tokens: Token[] = Lex(file.read(), file.getPath());
        console.log(tokens);
    }
}
