import { sgex } from "../src";

describe("sgex", () => {
    it("Should pass readme example tests", () => {
        const regex1 = sgex`Hello\nWorld!`;
        const regex2 = sgex`
            Hello
            ${" "}
            World !
        `;
        const regex3 = sgex`Hello${/ World/}!`;

        expect(regex1.source).toEqual("Hello\\nWorld!");
        expect(regex2.source).toEqual("Hello World !");
        expect(regex3.source).toEqual("Hello World!");
    });

    it("Should generate regular expressions with whitespace removed", () => {
        const regex = sgex`
            ^ a|b|c $
        `;

        expect(regex.source).toEqual(/^ a|b|c $/.source);

        expect(regex.test(" a")).toEqual(true);
        expect(regex.test("b")).toEqual(true);
        expect(regex.test("c ")).toEqual(true);
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

        const commentsObj = sgex`
            ${
                {
                    /* This is a comment */
                }
            }
            abc
        `;

        expect(comments.source).toEqual("abc");
        expect(commentsObj.source).toEqual("[object Object]abc");
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
});
