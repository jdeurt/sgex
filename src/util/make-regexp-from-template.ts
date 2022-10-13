export function makeRegExpFromTemplate(
    flags: string,
    strings: TemplateStringsArray,
    expressions: unknown[]
): RegExp {
    const raw = strings.raw.reduce((acc, curr, i) => {
        const expr = expressions[i];

        return `${acc}${
            curr
                .replace(/^\s+|\s+$/gm, "") // Remove surrounding whitespace
                .replace(/[\r\n]/g, "") // Remove new lines
        }${
            expr instanceof RegExp
                ? expr.source // Extract regular expression body if input is a regular expression
                : expr ?? "" // `.toString() ?? ""` otherwise
        }`;
    }, "");

    return new RegExp(raw, flags);
}
