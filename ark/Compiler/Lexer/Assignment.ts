export interface Assignement {
    identifier: string
}

const assign: (identifier: string) => Assignement = (identifier: string): Assignement => ({
    identifier
});

const assignements: Assignement[] = [
    assign("="),
    assign("+="),
    assign("-="),
    assign("*="),
    assign("/="),
    assign("%="),
    assign("**="),
    assign("**"), // x = x * x
    assign("\/\/"), // x = sqrt(x)
    assign("negate"), // x = !x
];

export default function findAssignment(token: string): Assignement {
    for (const assignement of assignements)
        if (assignement.identifier === token)
            return assignement;
    return null;
}