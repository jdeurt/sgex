import { sgex } from "../src";

describe("sgex", () => {
    it("Should generate regular expressions with whitespace removed", () => {
        const regex = sgex`
            ^ a|b|c $
        `;

        expect(regex.source).toEqual(/^a|b|c$/.source);

        expect(regex.test("a")).toEqual(true);
        expect(regex.test("b")).toEqual(true);
        expect(regex.test("c")).toEqual(true);
        expect(regex.test("d")).toEqual(false);
    });

    it("Should play well with comments", () => {
        const comments = sgex`
            ${
                [
                    /* This is a comment */
                ]
            }
            abc
        `;

        expect(comments.source).toEqual("abc");
    });

    it("Should allow for flags to be provided", () => {
        const regexCaseSensitive = sgex`a`;
        const regexCaseInsensitive = sgex("i")`a`;

        expect(regexCaseSensitive.test("A")).toEqual(false);
        expect(regexCaseInsensitive.test("A")).toEqual(true);
    });

    it("Should allow for interpolation", () => {
        const withRegexInterpolation = sgex`^a${/b/}c$`;
        const withWhitespaceInterpolation = sgex`
            ^a${" "}bc$
        `;

        expect(withRegexInterpolation.test("abc")).toEqual(true);
        expect(withWhitespaceInterpolation.test("a bc")).toEqual(true);
    });

    it("Should not fail on complex patterns", () => {
        const pattern = sgex("gm")`
            ${"```"}(?<lang>
                js|
                ts|
                python|
                java|
                cpp|
                c
            )?\n
                (?<content>
                    .*?
                )\n
            ${"```"}
        `;

        expect(pattern.test("```js\nabc\n```")).toEqual(true);
    });

    // it("Should not fail on complex patterns", () => {
    //     const isMathExpression: (str: string) => boolean = (str: string) => {
    //         console.log(str);

    //         if (str.startsWith("(") && str.endsWith(")")) {
    //             return isMathExpression(
    //                 str.match(sgex()`^\\(
    //                     (.+?)
    //                 \\)$`)![1]
    //             );
    //         }

    //         if (/^\d+(?:\.\d+)?$/.test(str)) {
    //             return true;
    //         }

    //         if (
    //             str.includes("+") ||
    //             str.includes("-") ||
    //             str.includes("*") ||
    //             str.includes("/")
    //         ) {
    //             const parts = str.split(sgex()`
    //                 [
    //                     \\+
    //                     \\-
    //                     \\*
    //                     \\/
    //                 ]
    //             `);

    //             return parts.every(isMathExpression);
    //         }

    //         return false;
    //     };

    //     expect(isMathExpression("1+1")).toEqual(true);
    //     expect(isMathExpression("1+1(")).toEqual(false);
    //     expect(isMathExpression("1+1()")).toEqual(false);
    //     expect(isMathExpression("1+1(1)")).toEqual(false);
    //     expect(isMathExpression("1+1*(1.87)")).toEqual(true);
    //     expect(isMathExpression("( ( 8*( 2/( 3+2.8 )+3 ) ) )/2")).toEqual(true);
    //     expect(isMathExpression("((8*(2/(3+2.8)+3)))/2)")).toEqual(false);
    // });
});
