# sgex

[![Version](https://img.shields.io/npm/v/sgex.svg)](https://www.npmjs.com/package/sgex)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D16-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> Tagged template literals that produce regex with all whitespace removed

## Installation

### NPM

```bash
npm i inline-conditional
```

### Yarn

```bash
yarn add inline-conditional
```

## Usage

```js
sgex`
    \`\`\`js\\n
    console\\.log\\("Hello${" "}World!"\\);\\n
    \`\`\`
`;
```

is equivalent to

````js
/```js\nconsole\.log\("Hello World!"\);\n```/;
````

### Regular expression flags

You can specify flags that should be used for your expression by using the flags overload:

```js
// Flags
sgex("gi")`^abc$`;

// No flags
sgex`^abc$`;
```

### Need whitespace? No Problem

You can force whitespace to be included by using `${interpolation}`. Interpolated regular expressions will function as expected.

```js
sgex`
    a${" "}b${/ c/}
`;

// Same as
/a b c/;
```

## License

MIT © [Juan de Urtubey](https://jdeurt.xyz)
