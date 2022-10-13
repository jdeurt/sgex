function makeRegExpFromTemplate(
    flags: string,
    strings: TemplateStringsArray,
    expressions: unknown[]
): RegExp {
    const raw = strings.raw.reduce((acc, curr, i) => {
        const expr = expressions[i];

        return `${acc}${curr.replace(/\s+/g, "")}${
            expr instanceof RegExp ? expr.source : expr ?? ""
        }`;
    }, "");

    return new RegExp(raw, flags);
}

export function sgex(
    flags: string
): (strings: TemplateStringsArray, ...expressions: unknown[]) => RegExp;

export function sgex(
    strings: TemplateStringsArray,
    ...expressions: unknown[]
): RegExp;

export function sgex(
    flagsOrStrings: string | TemplateStringsArray,
    ...expressions: unknown[]
) {
    if (arguments.length === 1 && typeof flagsOrStrings === "string") {
        const flags = flagsOrStrings as string;

        return function (
            strings: TemplateStringsArray,
            ...expressions: unknown[]
        ): RegExp {
            return makeRegExpFromTemplate(flags, strings, expressions);
        };
    }

    const strings = flagsOrStrings as TemplateStringsArray;

    return makeRegExpFromTemplate("", strings, expressions);
}
