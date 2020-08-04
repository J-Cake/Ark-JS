const grammarTest = require('../build/ark/Compiler/Lexer/Grammar').default;
const {TokenType} = require('../build/ark/Compiler/Lexer/Token');

describe("Grammar", function () {
    it("Test string", () => expect(grammarTest[TokenType.string]('"string"')).toBe(true));
    it("Test int", () => expect(grammarTest[TokenType.int]('10')).toBe(true));
    it("Test float", () => expect(grammarTest[TokenType.float]('10.2')).toBe(true));
    it("Test scientific", () => expect(grammarTest[TokenType.scientific]('1.2e6')).toBe(true));
    it("Test reference", () => expect(grammarTest[TokenType.reference]('knob03')).toBe(true));
    it("Test operator", () => expect(grammarTest[TokenType.operator]("+")).toBe(true));
    it("Test comment", () => expect(grammarTest[TokenType.comment]("# managed to escape")).toBe(true));
    it("Test comma", () => expect(grammarTest[TokenType.comma](",")).toBe(true));
    it("Test period", () => expect(grammarTest[TokenType.period](".")).toBe(true));
    it("Test left parenthesis", () => expect(grammarTest[TokenType.lParenthesis]("(")).toBe(true));
    it("Test right parenthesis", () => expect(grammarTest[TokenType.rParenthesis](")")).toBe(true));
    it("Test left brace", () => expect(grammarTest[TokenType.lBrace]("{")).toBe(true));
    it("Test right brace", () => expect(grammarTest[TokenType.rBrace]("}")).toBe(true));
    it("Test left bracket", () => expect(grammarTest[TokenType.lBracket]("[")).toBe(true));
    it("Test right bracket", () => expect(grammarTest[TokenType.rBracket]("]")).toBe(true));
});
