export interface Operator {
    identifier: string,
    precedence: number,
    isLeftAssociative: boolean,
    returnsBoolean: boolean,
    operandNum: number
};

const op: (identifier: string, precedence: number, isLeftAssociative?: boolean, returnsBoolean?: boolean, operandNum?: number) => Operator =
    (identifier: string, precedence: number, isLeftAssociative: boolean = true, returnsBoolean: boolean = false, operandNum: number = 2) => ({
        identifier,
        precedence,
        isLeftAssociative,
        returnsBoolean,
        operandNum
    })

const operators: Operator[] = [
    op("+", 3),
    op("-", 3),
    op("*", 4),
    op("/", 4),
    op("%", 4),
    op("**", 5, false),
    op("!", 5, false, false, 1),
    op("and", 2, true, true),
    op("or", 2, true, true),
    op("not", 2, false, true, 1),
    op("xor", 2, true, true),
    op("<", 1, true, true),
    op(">", 1, true, true),
    op("==", 1, true, true),
    op("fallback", 1, true, true, 1), // coalescing
    op("notnull", 1, false, true, 1),
    op("truthy", 1, true, true, 1),
    op("falsy", 1, true, true, 1)
];

export default function findOperator(token: string): Operator {
    for (const operator of operators)
        if (operator.identifier === token)
            return operator;
    return null;
}