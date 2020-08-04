export enum TokenType {
    string,
    int, 
    float,
    scientific, // A Number expressed in scientific notation (1.2e7)
    reference,
    operator,
    lParenthesis, // (
    rParenthesis, // )
    lBrace, // {
    rBrace, // }
    lBracket, // [
    rBracket, // ]
    comma,
    period,
    comment
}

export default interface Token {
    source: string,
    tokenTypes: TokenType[],
    origin: {
        line: number,
        char: number,
        file: string
    }
}