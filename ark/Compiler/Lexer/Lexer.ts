import grammar from './Grammar';
import Token, { TokenType } from './Token';

export default function Lex(source: string, path: string = "<Inline>"): Token[] {
    const tokens: Token[] = [];

    // const source: string = file.read();

    const builder: string[] = [];

    const pos: {
        line: number,
        char: number
    } = {
        line: 0,
        char: 0
    }

    // Greedily match grammar list
    // Record all matches and once no matches are returned, emit the longest

    const matches: string[] = [];

    const pushToken: () => void = function (): void {
        if (matches.length > 0) {
            let longest: string = matches[0];

            for (const match of matches)
                if (match.length > longest.length)
                    longest = match;

            const types: TokenType[] = [];

            for (const type in grammar)
                if (grammar[type as keyof TokenType](builder.join('')))
                    types.push(TokenType[type as keyof TokenType]);

            tokens.push({
                source: builder.join(''),
                tokenTypes: types,
                origin: {
                    ...pos,
                    file: path
                }
            });

            builder.splice(0, builder.length);
        }
    }

    for (const char of Array.from(source)) {
        if (Object.values(grammar).map(i => i(builder.join(''))).includes(true))
            matches.push(builder.join(''));
        if (!Object.values(grammar).map(i => i([...builder, char].join(''))).includes(true))
            pushToken();

        builder.push(char)
    }

    pushToken()

    return tokens.filter(i => i.tokenTypes.length > 0);
}
