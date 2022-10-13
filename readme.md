# sgex

[![Version](https://img.shields.io/npm/v/sgex.svg)](https://www.npmjs.com/package/sgex)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D16-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> Tagged template literals that produce regex with all whitespace removed

## Installation

### NPM

```bash
npm i sgex
```

### Yarn

```bash
yarn add sgex
```

## Usage

An `sgex` tag will:

-   Ignore escape sequences

```js
sgex`Hello\nWorld!`;

// Returns
/Hello\nWorld/;
```

-   Remove all whitespace not inside interpolated expressions

```js
sgex`
    Hello
    ${" "}
    World !
`;

// Returns
/Hello World!/;
```

-   Handle interpolated regular expressions correctly

```js
sgex`Hello${/ World/}!`;

// Returns
/Hello World!/;
```

### Regular expression flags

You can specify flags that should be used for your expression by using the flags overload:

```js
// Flags
sgex("gi")`^abc$`;

// No flags
sgex`^abc$`;
```

## License

MIT © [Juan de Urtubey](https://jdeurt.xyz)
