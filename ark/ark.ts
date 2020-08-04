import * as yargs from 'yargs';
import Compiler from "./Compiler/Compiler";
import PathResolver, {Type} from "./util/PathResolver";
import * as os from "os";

const options = yargs.option("main", {
    description: "Specify the main file at which to begin compilation",
    type: "string"
}).option("file", {
    alias: 'f',
    description: "A file to compile",
    type: "string"
});

const file: string = options.argv["file"] || options.argv._[0]

const pathResolver: PathResolver = new PathResolver({
    root: __dirname,
    pathType: ['win32', 'win64'].includes(os.platform()) ? Type.Windows : Type.Unix
});

const compiler: Compiler = new Compiler(pathResolver.clean(file), {});

compiler.compile();

