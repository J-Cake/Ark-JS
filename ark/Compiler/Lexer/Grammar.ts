import { TokenType } from "./Token";
import findOperator from "./Operator";

const grammar: Record<TokenType, (source: string) => boolean> = {
    [TokenType.string]: token => /^".[^"]*"$/.test(token) || /^'.[^"]*'$/.test(token), // does not account for escaped characters
    [TokenType.int]: token => /^-?[0-9]+$/.test(token),
    [TokenType.float]: token => /^-?[0-9]+\.[0-9]+$/.test(token),
    [TokenType.scientific]: token => /^[0-9](\.[0-9]+)?e(-?[0-9]+)$/.test(token),
    [TokenType.reference]: token => /^[a-zA-Z$_][a-zA-Z0-9$_]*$/.test(token),
    [TokenType.operator]: token => findOperator(token) !== null,
    [TokenType.comment]: token => token.startsWith("#"),

    [TokenType.comma]: token => token === ",",
    [TokenType.period]: token => token === ".",
    [TokenType.lParenthesis]: token => token === "(",
    [TokenType.lBrace]: token => token === "{",
    [TokenType.lBracket]: token => token === "[",
    [TokenType.rParenthesis]: token => token === ")",
    [TokenType.rBrace]: token => token === "}",
    [TokenType.rBracket]: token => token === "]"
};

export default grammar;
