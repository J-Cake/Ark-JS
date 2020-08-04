const Lex = require('../build/ark/Compiler/Lexer/Lexer').default;
const {TokenType} = require('../build/ark/Compiler/Lexer/Token');

describe("Attempt to throw the lexer off", function() {
    it("Confirm lexer works by attempting to split a simple string", function() {
        const expected = [TokenType.string, TokenType.int, TokenType.float, TokenType.scientific];
        expect(Lex(`"Hello World" 3 3.1 1.4e7`).map((i, a) => i.tokenTypes.includes(expected[a]))).not.toContain(true);
    });
});
