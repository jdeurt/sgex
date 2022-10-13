import { makeRegExpFromTemplate } from "../util/make-regexp-from-template";

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
